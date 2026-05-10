
# Plan: Backend funcional para Fasmerco

Sobre Cloudinary: **sí, sirve perfecto** para las fotos de productos. Usaremos *unsigned uploads* desde el Dashboard con un Upload Preset, así las tiendas suben directo desde el navegador sin pasar por el servidor. Solo guardamos la URL pública resultante en la base de datos de Supabase.

## Cómo conectamos tu Supabase

En lugar de Lovable Cloud, conectaremos tu proyecto existente. Vas a necesitar tenerlos a la mano cuando empecemos a implementar:

1. **Supabase URL** y **anon/publishable key** (del proyecto en supabase.com → Project Settings → API).
2. **Cloudinary Cloud Name** y un **Upload Preset** en modo *unsigned* (Cloudinary → Settings → Upload → Add upload preset).

No pegues los valores en el chat; te pediré que los introduzcas en el formulario seguro de secretos cuando llegue el momento.

## Arquitectura propuesta

```text
Frontend (React + Vite)  ──►  Supabase Auth (sesión)
        │                 ──►  Supabase Postgres (datos)
        │                 ──►  Cloudinary (imágenes vía unsigned upload)
        └────────────►  Estado global de sesión (AuthContext)
```

Roles: `buyer` (comprador) y `store` (tienda), guardados en una tabla **`user_roles`** aparte (nunca en `profiles`) para evitar escalada de privilegios.

## Esquema de base de datos

```text
profiles (id = auth.users.id, full_name, phone, avatar_url)
stores   (id, owner_id → auth.users, name, slug, email, phone,
          category, description, logo_url, banner_url, visits)
user_roles (user_id, role: 'buyer' | 'store')

categories      (id, slug, name, parent_id)   -- jerárquica
products        (id, store_id, category_id, name, description,
                 price, compare_at_price, stock, images jsonb,
                 attributes jsonb, active, created_at)
favorites       (user_id, product_id)
reviews         (id, product_id, user_id, rating, comment, created_at)

orders          (id, buyer_id, status, total, address, created_at)
order_items     (id, order_id, product_id, store_id, qty, price)
cart_items      (user_id, product_id, qty)    -- carrito persistente
```

Todas las tablas con **RLS activado**. Helpers `has_role(uid, role)` y `is_store_owner(uid, store_id)` como `SECURITY DEFINER` para evitar recursión.

Reglas RLS clave:
- `products`: lectura pública; insert/update/delete solo si `is_store_owner`.
- `stores`: lectura pública; update solo el `owner_id`.
- `cart_items`, `favorites`: solo el dueño.
- `orders`: el comprador ve los suyos; la tienda ve solo los `order_items` de sus productos.
- `reviews`: lectura pública; el autor edita/borra los suyos.

Trigger `on_auth_user_created` que crea `profiles` automáticamente. El rol y el registro en `stores` se crean desde la app tras el signup según el tipo elegido.

## Fases de implementación

**Fase 1 — Cimientos (conexión + auth real)**
- Instalar `@supabase/supabase-js`, crear cliente, pedir secretos (URL, anon key).
- Migración SQL: `profiles`, `user_roles`, `stores`, trigger de signup, RLS básica.
- Reescribir `AuthPage.tsx` para usar `supabase.auth.signUp` / `signInWithPassword` con `emailRedirectTo: window.location.origin`.
- Habilitar **Google** como proveedor OAuth (en tu dashboard de Supabase). Facebook queda apuntado como pendiente porque requiere configuración manual en Meta — te dejo instrucciones cuando lleguemos.
- `AuthContext` con `onAuthStateChange` (configurado **antes** de `getSession`) que expone `user`, `session`, `role`, `signOut`.
- Proteger `/dashboard` (solo `store`) y `/account` (solo autenticado).
- `LoginPage` deja de elegir rol manual: redirige según el rol real del usuario.

**Fase 2 — Catálogo real**
- Migración: `categories`, `products` + seed de categorías a partir de `src/data/megamenu.ts`.
- Cloudinary: integración de unsigned upload (cloud name como variable pública `VITE_CLOUDINARY_CLOUD_NAME`, preset también público).
- Dashboard: CRUD de productos con formulario que cambia campos según categoría/subcategoría (mantenemos la lógica actual, solo cambian los hooks). Subida de varias imágenes a Cloudinary.
- `Index`, `SearchPage`, `ProductPage`, `StorePage` leen de Supabase con React Query. Se retira `src/data/products.ts`.

**Fase 3 — Carrito, favoritos y pedidos**
- `CartContext` se vuelve persistente: lee/escribe `cart_items` cuando hay sesión; cae a `localStorage` si no.
- `FavoritesPage` leyendo `favorites`.
- Checkout simulado: crea `orders` + `order_items`, descuenta stock en una **función `place_order` SECURITY DEFINER** transaccional; limpia carrito.
- Dashboard: vista de pedidos por tienda, cambio de estado (pendiente → enviado → entregado).

**Fase 4 — Reseñas y métricas**
- Reseñas en `ProductPage` con estrella y comentario; solo compradores con pedido entregado pueden reseñar (regla en RLS).
- Dashboard: contador de visitas (incrementa al abrir `StorePage`), ingresos (suma de `order_items` entregados), top productos, total de reseñas.

**Fase 5 — Pulido**
- Página `/reset-password` para recuperación de contraseña.
- Activar HIBP (protección contra contraseñas filtradas) en Supabase.
- Validación con Zod en todos los formularios.
- QA por roles: comprador completo end-to-end y tienda completo end-to-end.

## Decisiones técnicas importantes (para tu visibilidad)

- **Facebook OAuth**: Supabase no tiene Facebook como proveedor "un clic" igual de simple que Google; requiere crear una app en Meta for Developers. Lo dejo en fase 5 con guía paso a paso, o lo quitamos del UI si prefieres. Google y Apple sí son directos.
- **Cloudinary vs Supabase Storage**: Cloudinary es perfecto aquí; nos da CDN, transformaciones (resize/optimización) sin código y no consume tu cuota de Storage de Supabase. Solo guardamos la `secure_url` en `products.images`.
- **Vercel**: como ya está desplegado, después de la fase 1 hay que añadir las variables `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` y `VITE_CLOUDINARY_*` en el panel de Vercel para que producción funcione. Te aviso cuando toque.
- **Seed de datos**: los productos actuales en `src/data/products.ts` se migran como seed inicial vinculados a las tiendas demo para que la app no se vea vacía al arrancar.

## Qué pasa al aprobar el plan

Empezamos por la **Fase 1**: te pediré la URL y anon key de Supabase mediante el formulario seguro, creo la migración inicial, conecto el cliente y dejo el login/registro funcionando de verdad. Las fases siguientes las hacemos una a una para que valides cada paso.
