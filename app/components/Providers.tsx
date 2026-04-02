"use client";

import { CartProvider } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import Navbar from "./Navbar";
import { AdminProvider } from "../context/AdminContext";
import AuthSessionDebugListener from "./AuthSessionDebugListener";
import WhatsAppButton from "./WhatsAppButton";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AuthSessionDebugListener />
      <CartProvider>
        <Navbar />
        {children}
        <CartDrawer />
        <WhatsAppButton />
      </CartProvider>
    </AdminProvider>
  );
}
