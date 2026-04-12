import { ShieldCheck, RotateCcw, Headphones } from "lucide-react";

const TrustFooter = () => (
  <footer className="bg-foreground text-background mt-16">
    {/* Trust badges */}
    <div className="border-b border-background/10">
      <div className="container mx-auto max-w-[1440px] px-6 py-8 grid grid-cols-3 gap-8">
        {[
          { icon: ShieldCheck, title: "Compra 100% Segura", desc: "Protegemos cada transacción" },
          { icon: RotateCcw, title: "Devoluciones Locales Fáciles", desc: "Devuelve en tu ciudad sin complicaciones" },
          { icon: Headphones, title: "Soporte en Cali", desc: "Atención local cuando la necesites" },
        ].map((b) => (
          <div key={b.title} className="flex items-start gap-3 text-center flex-col items-center">
            <div className="bg-primary/20 p-3 rounded-full">
              <b.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">{b.title}</p>
              <p className="text-xs text-background/60 mt-0.5">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Links */}
    <div className="container mx-auto max-w-[1440px] px-6 py-10 grid grid-cols-3 gap-8">
      <div>
        <h4 className="font-bold text-sm mb-3">Sobre Fasmerco</h4>
        <ul className="space-y-2 text-xs text-background/60">
          <li className="hover:text-background cursor-pointer transition">¿Quiénes somos?</li>
          <li className="hover:text-background cursor-pointer transition">Blog</li>
          <li className="hover:text-background cursor-pointer transition">Términos y condiciones</li>
          <li className="hover:text-background cursor-pointer transition">Política de privacidad</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-sm mb-3">Ayuda y Soporte</h4>
        <ul className="space-y-2 text-xs text-background/60">
          <li className="hover:text-background cursor-pointer transition">Centro de ayuda</li>
          <li className="hover:text-background cursor-pointer transition">Mis pedidos</li>
          <li className="hover:text-background cursor-pointer transition">Devoluciones</li>
          <li className="hover:text-background cursor-pointer transition">Contacto</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-sm mb-3">Vende con nosotros</h4>
        <ul className="space-y-2 text-xs text-background/60">
          <li className="hover:text-background cursor-pointer transition">Registra tu tienda</li>
          <li className="hover:text-background cursor-pointer transition">Beneficios para vendedores</li>
          <li className="hover:text-background cursor-pointer transition">Centro de vendedores</li>
        </ul>
      </div>
    </div>

    <div className="border-t border-background/10 text-center py-4 text-xs text-background/40">
      © 2026 Fasmerco — Fast + Mercado + Colombia. Todos los derechos reservados.
    </div>
  </footer>
);

export default TrustFooter;
