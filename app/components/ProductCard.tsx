"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import type { Product } from "../data/products";

export function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-CL")}`;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, type: "product" });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(92,58,72,0.12)]">
      {/* Image placeholder */}
      <div className={`relative flex h-52 items-center justify-center bg-gradient-to-br ${product.gradient}`}>
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-[#5C3A48] px-3 py-1 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-wider text-white uppercase">
            {product.badge}
          </span>
        )}
        {/* Bottle silhouette */}
        <div className="flex flex-col items-center gap-1 opacity-25">
          <div className="h-2 w-6 rounded-t-full bg-white" />
          <div className="h-24 w-14 rounded-2xl bg-white" />
          <div className="h-3 w-12 rounded-b-lg bg-white/70" />
        </div>
        {/* Volume */}
        <div className="absolute bottom-4 right-4 rounded-full bg-white/60 px-2.5 py-1 backdrop-blur-sm">
          <span className="font-[family-name:var(--font-inter)] text-[10px] font-medium text-[#5C3A48]">
            {product.volume}
          </span>
        </div>
        {/* Category pill */}
        <div className="absolute left-4 bottom-4 rounded-full bg-white/50 px-2.5 py-1 backdrop-blur-sm">
          <span className="font-[family-name:var(--font-inter)] text-[10px] font-light text-[#5C3A48]">
            {product.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#2C2329]">
          {product.name}
        </h3>
        <p className="flex-1 font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">
          {product.description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-[#E8C9C1]/50 pt-4">
          <span className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#5C3A48]">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAdd}
            className={`rounded-full border px-4 py-1.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
              added
                ? "border-[#5C3A48] bg-[#5C3A48] text-white"
                : "border-[#8B5E6D] text-[#8B5E6D] hover:bg-[#8B5E6D] hover:text-white"
            }`}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            {added ? "✓ Agregado" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}
