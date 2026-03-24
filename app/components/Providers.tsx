"use client";

import { CartProvider } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import Navbar from "./Navbar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
