"use client";

import { CartProvider } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import Navbar from "./Navbar";
import { AdminProvider } from "../context/AdminContext";
import AuthSessionDebugListener from "./AuthSessionDebugListener";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AuthSessionDebugListener />
      <CartProvider>
        <Navbar />
        {children}
        <CartDrawer />
      </CartProvider>
    </AdminProvider>
  );
}
