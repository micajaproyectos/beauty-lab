"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import type { DbProduct } from "@/lib/types";

export function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-CL")}`;
}

interface Props {
  product: DbProduct;
  isAdmin: boolean;
  onEdit: () => void;
  onToggle: () => void;
}

export default function ProductCardDB({ product, isAdmin, onEdit, onToggle }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: String(product.id),
      name: product.nombre,
      price: product.precio,
      type: "product",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(92,58,72,0.12)] ${!product.activo ? "opacity-50" : ""}`}>

      {/* Image area */}
      <div className="relative h-80 overflow-hidden bg-[#F2E4DF]">
        {product.imagen_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imagen_url}
            alt={product.nombre}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#F2E4DF] to-[#E8C9C1]">
            <div className="flex flex-col items-center gap-1 opacity-25">
              <div className="h-2 w-6 rounded-t-full bg-[#5C3A48]" />
              <div className="h-24 w-14 rounded-2xl bg-[#5C3A48]" />
              <div className="h-3 w-12 rounded-b-lg bg-[#5C3A48]/70" />
            </div>
          </div>
        )}

        {/* Hidden badge */}
        {isAdmin && !product.activo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full bg-black/60 px-3 py-1 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-widest text-white uppercase">
              Oculto
            </span>
          </div>
        )}

        {/* Highlight badge (Recomendado, Más vendido, etc.) */}
        {product.badge && (
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-[#5C3A48] px-3 py-1 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-wider text-white shadow-sm">
              {product.badge}
            </span>
          </div>
        )}

        {/* Category + skin type pills */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          <div className="rounded-full bg-white/70 px-2.5 py-1 backdrop-blur-sm">
            <span className="font-[family-name:var(--font-inter)] text-[10px] font-light text-[#5C3A48]">
              {product.categoria}
            </span>
          </div>
          {product.tipo_piel && (
            <div className="rounded-full bg-[#E8C9C1]/80 px-2.5 py-1 backdrop-blur-sm">
              <span className="font-[family-name:var(--font-inter)] text-[10px] font-light text-[#5C3A48]">
                {product.tipo_piel}
              </span>
            </div>
          )}
        </div>

        {/* Admin buttons */}
        {isAdmin && (
          <div className="absolute right-3 top-3 flex gap-1.5">
            <button
              onClick={onToggle}
              aria-label={product.activo ? "Ocultar producto" : "Mostrar producto"}
              title={product.activo ? "Ocultar de la web" : "Mostrar en la web"}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all hover:bg-[#5C3A48] hover:text-white"
              style={{ color: "#5C3A48" }}
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {product.activo
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                }
              </svg>
            </button>
            <button
              onClick={onEdit}
              aria-label="Editar producto"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all hover:bg-[#5C3A48] hover:text-white"
              style={{ color: "#5C3A48" }}
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#2C2329]">
          {product.nombre}
        </h3>
        <p className="flex-1 font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">
          {product.descripción}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-[#E8C9C1]/50 pt-4">
          <span className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#5C3A48]">
            {formatPrice(product.precio)}
          </span>
          <button
            onClick={handleAdd}
            disabled={!product.activo && !isAdmin}
            className={`rounded-full border px-4 py-1.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
              added
                ? "border-[#5C3A48] bg-[#5C3A48] text-white"
                : "border-[#8B5E6D] text-[#8B5E6D] hover:bg-[#8B5E6D] hover:text-white"
            }`}
            aria-label={`Agregar ${product.nombre} al carrito`}
          >
            {added ? "✓ Agregado" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}
