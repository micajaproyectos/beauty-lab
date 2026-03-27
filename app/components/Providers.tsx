"use client";

import { CartProvider } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import Navbar from "./Navbar";
import { AdminProvider } from "../context/AdminContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <CartProvider>
        <Navbar />
        {children}
        <CartDrawer />
      </CartProvider>
    </AdminProvider>
  );
}
