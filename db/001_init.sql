-- =====================================================================
-- Fasmerco — Migración inicial (Fase 1)
-- Cópialo y pégalo en el SQL Editor de tu proyecto de Supabase y ejecuta.
-- =====================================================================

-- 1) ENUM de roles
do $$ begin
  create type public.app_role as enum ('buyer', 'store');
exception when duplicate_object then null; end $$;

-- 2) Tabla profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3) Tabla user_roles
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

-- 4) Tabla stores
create table if not exists public.stores (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  slug text unique not null,
  email text,
  phone text,
  category text,
  description text,
  logo_url text,
  banner_url text,
  visits integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists stores_owner_id_idx on public.stores(owner_id);

-- 5) has_role (SECURITY DEFINER, evita recursión RLS)
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- 6) get_user_role
create or replace function public.get_user_role(_user_id uuid)
returns public.app_role language sql stable security definer set search_path = public as $$
  select role from public.user_roles where user_id = _user_id limit 1
$$;

-- 7) Trigger de creación de profile al registrarse
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'phone', '')
  )
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 8) updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists stores_updated_at on public.stores;
create trigger stores_updated_at before update on public.stores
  for each row execute function public.set_updated_at();

-- =====================================================================
-- RLS
-- =====================================================================
alter table public.profiles    enable row level security;
alter table public.user_roles  enable row level security;
alter table public.stores      enable row level security;

drop policy if exists "profiles_self_select" on public.profiles;
create policy "profiles_self_select" on public.profiles
  for select to authenticated using (auth.uid() = id);

drop policy if exists "profiles_self_update" on public.profiles;
create policy "profiles_self_update" on public.profiles
  for update to authenticated using (auth.uid() = id);

drop policy if exists "profiles_self_insert" on public.profiles;
create policy "profiles_self_insert" on public.profiles
  for insert to authenticated with check (auth.uid() = id);

drop policy if exists "user_roles_self_select" on public.user_roles;
create policy "user_roles_self_select" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "user_roles_self_insert" on public.user_roles;
create policy "user_roles_self_insert" on public.user_roles
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "stores_public_select" on public.stores;
create policy "stores_public_select" on public.stores
  for select using (true);

drop policy if exists "stores_owner_insert" on public.stores;
create policy "stores_owner_insert" on public.stores
  for insert to authenticated with check (auth.uid() = owner_id);

drop policy if exists "stores_owner_update" on public.stores;
create policy "stores_owner_update" on public.stores
  for update to authenticated using (auth.uid() = owner_id);

drop policy if exists "stores_owner_delete" on public.stores;
create policy "stores_owner_delete" on public.stores
  for delete to authenticated using (auth.uid() = owner_id);
