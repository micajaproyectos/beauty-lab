"use client";

import { CartProvider } from "../context/CartContext";
import { AgendarProvider } from "../context/AgendarContext";
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
        <AgendarProvider>
          <Navbar />
          {children}
          <CartDrawer />
          <WhatsAppButton />
        </AgendarProvider>
      </CartProvider>
    </AdminProvider>
  );
}
