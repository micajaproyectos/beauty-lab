import Link from "next/link";
import ProductCard from "./ProductCard";
import { featuredProducts } from "../data/products";

export default function Products() {
  return (
    <section id="productos" className="bg-[#F2E4DF]/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="mb-4 inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase">
              Skincare Selección
            </span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] sm:text-5xl lg:text-6xl">
              Productos de cabecera
            </h2>
            <div className="mt-4 h-px w-16 bg-[#D4A5A0]" />
          </div>
          <p className="max-w-xs font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E] sm:text-right">
            Formulados con ingredientes de alta pureza.
            <br />
            Sin parabenos, sin sulfatos.
          </p>
        </div>

        {/* Featured Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Ver todos CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
          <Link
            href="/productos"
            className="inline-flex items-center gap-3 rounded-full border border-[#5C3A48] px-8 py-3.5 font-[family-name:var(--font-inter)] text-sm font-medium tracking-widest text-[#5C3A48] uppercase transition-all hover:bg-[#5C3A48] hover:text-[#FAF8F5]"
          >
            Ver catálogo completo
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>
          <p className="font-[family-name:var(--font-inter)] text-xs font-light text-[#B5A8AC]">
            +17 productos disponibles
          </p>
        </div>
      </div>
    </section>
  );
}
