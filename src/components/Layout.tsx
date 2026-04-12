import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "@/components/TopBar";
import MainHeader from "@/components/MainHeader";
import CategoryNav from "@/components/CategoryNav";
import CartDrawer from "@/components/CartDrawer";
import TrustFooter from "@/components/TrustFooter";

const Layout = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <MainHeader onCartOpen={() => setCartOpen(true)} />
      <CategoryNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <TrustFooter />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Layout;
