"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

// ─── Reservar Modal ──────────────────────────────────────────────────────────

function ReservarModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[200] bg-[#2C2329]/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservar-modal-title"
        className="fixed left-1/2 top-1/2 z-[201] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[#FAF8F5] p-8 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="mb-1 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[0.3em] text-[#C9A96E] uppercase">
              Beauty Lab
            </p>
            <h2
              id="reservar-modal-title"
              className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#2C2329]"
            >
              ¿Qué estás buscando?
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#E8C9C1] text-[#7A6A6E] transition-colors hover:bg-[#F2E4DF]"
            aria-label="Cerrar"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Options */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Estética Facial */}
          <button
            onClick={() => handleSelect("/servicios")}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#E8C9C1]/60 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(92,58,72,0.14)]"
          >
            <div className="flex h-32 items-end justify-start bg-gradient-to-br from-[#5C3A48] via-[#8B5E6D] to-[#D4A5A0] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
            </div>
            <div className="p-5">
              <h3 className="mb-1.5 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#2C2329]">
                Estética Facial
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-xs font-light leading-relaxed text-[#7A6A6E]">
                Toxina botulínica, ácido hialurónico, bioestimulación, hilos tensores y más.
              </p>
              <div className="mt-4 flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-wider text-[#5C3A48] uppercase">
                Ver tratamientos
                <svg className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </div>
            </div>
          </button>

          {/* Cosmética Coreana */}
          <button
            onClick={() => handleSelect("/productos")}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#E8C9C1]/60 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(201,169,110,0.2)]"
          >
            <div className="flex h-32 items-end justify-start bg-gradient-to-br from-[#C9A96E] via-[#E8C9A0] to-[#F5E6D3] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/30 text-[#5C3A48] backdrop-blur-sm">
                <span className="text-lg">🇰🇷</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="mb-1.5 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#2C2329]">
                Cosmética Coreana
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-xs font-light leading-relaxed text-[#7A6A6E]">
                Protectores solares, hidratantes y tratamientos K-Beauty de alta eficacia.
              </p>
              <div className="mt-4 flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-wider text-[#C9A96E] uppercase">
                Ver productos
                <svg className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </div>
            </div>
          </button>

          {/* SkinCoach */}
          <button
            onClick={() => handleSelect("/servicios#skincoach")}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#E8C9C1]/60 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(139,94,109,0.18)]"
          >
            <div className="flex h-32 items-end justify-start bg-gradient-to-br from-[#8B5E6D] via-[#D4A5A0] to-[#F2E4DF] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/25 text-white backdrop-blur-sm">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
            </div>
            <div className="p-5">
              <h3 className="mb-1.5 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#2C2329]">
                SkinCoach
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-xs font-light leading-relaxed text-[#7A6A6E]">
                Diagnóstico de piel y rutina personalizada con criterio médico.
              </p>
              <div className="mt-4 flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-wider text-[#8B5E6D] uppercase">
                Conocer más
                <svg className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        <p className="mt-5 text-center font-[family-name:var(--font-inter)] text-[10px] font-light tracking-wider text-[#B5A8AC]">
          También puedes contactarnos por WhatsApp si tienes dudas
        </p>
      </div>
    </>
  );
}

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Tratamientos", href: "/servicios" },
  { label: "Productos", href: "/productos" },
  { label: "Nosotras", href: "/#nosotras" },
  { label: "Contacto", href: "/#cta" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reservarOpen, setReservarOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const pathname = usePathname();

  // Pages with a dark hero header — navbar needs light text when transparent
  const darkHeaderPages = ["/servicios", "/productos"];
  const hasDarkHeader = darkHeaderPages.includes(pathname);

  const isActive = (href: string) =>
    href.startsWith("/") && !href.includes("#") && pathname === href;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF8F5]/95 backdrop-blur-md shadow-[0_1px_20px_rgba(44,35,41,0.08)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none">
          <span className={`font-[family-name:var(--font-cormorant)] text-2xl font-light tracking-widest transition-colors ${!scrolled && hasDarkHeader ? "text-white" : "text-[#5C3A48]"}`}>
            BEAUTY
          </span>
          <span className={`font-[family-name:var(--font-cormorant)] text-[10px] font-light tracking-[0.35em] transition-colors ${!scrolled && hasDarkHeader ? "text-white/70" : "text-[#8B5E6D]"}`}>
            LAB
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-[family-name:var(--font-inter)] text-sm font-light tracking-widest uppercase transition-colors ${
                  isActive(link.href)
                    ? !scrolled && hasDarkHeader
                      ? "text-white border-b border-[#C9A96E] pb-0.5 hover:text-white"
                      : "text-[#5C3A48] border-b border-[#C9A96E] pb-0.5 hover:text-[#5C3A48]"
                    : !scrolled && hasDarkHeader
                    ? "text-white/80 hover:text-white"
                    : "text-[#7A6A6E] hover:text-[#5C3A48]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions: Reservar + Cart + Mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setReservarOpen(true)}
            className={`hidden rounded-full border px-6 py-2 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest uppercase transition-all md:inline-flex ${
              !scrolled && hasDarkHeader
                ? "border-white/60 text-white hover:bg-white hover:text-[#5C3A48]"
                : "border-[#5C3A48] text-[#5C3A48] hover:bg-[#5C3A48] hover:text-[#FAF8F5]"
            }`}
          >
            Reservar
          </button>

          {/* Admin access — visible también en móvil (junto al carrito) */}
          <Link
            href="/login"
            aria-label="Acceso administrador"
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all ${
              !scrolled && hasDarkHeader
                ? "text-white/30 hover:text-white/70"
                : "text-[#B5A8AC] hover:text-[#8B5E6D]"
            }`}
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </Link>

          {/* Cart button */}
          <button
            onClick={toggleCart}
            className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
              !scrolled && hasDarkHeader
                ? "border-white/40 text-white hover:bg-white/20"
                : "border-[#E8C9C1] text-[#5C3A48] hover:bg-[#F2E4DF]"
            }`}
            aria-label="Abrir carrito"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C9A96E] font-[family-name:var(--font-inter)] text-[9px] font-medium text-white">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col gap-[5px] p-1 md:hidden"
            aria-label="Abrir menú"
          >
            <span className={`block h-px w-6 transition-all duration-300 ${!scrolled && hasDarkHeader ? "bg-white" : "bg-[#5C3A48]"} ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 transition-all duration-300 ${!scrolled && hasDarkHeader ? "bg-white" : "bg-[#5C3A48]"} ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 transition-all duration-300 ${!scrolled && hasDarkHeader ? "bg-white" : "bg-[#5C3A48]"} ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          menuOpen ? "max-h-[28rem]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 bg-[#FAF8F5] px-6 pb-6 pt-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 font-[family-name:var(--font-inter)] text-sm font-light tracking-widest uppercase border-b border-[#E8C9C1] last:border-0 transition-colors hover:text-[#5C3A48] ${
                  isActive(link.href) ? "text-[#5C3A48]" : "text-[#7A6A6E]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <button
              onClick={() => { setMenuOpen(false); setReservarOpen(true); }}
              className="block w-full rounded-full border border-[#5C3A48] py-3 text-center font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest text-[#5C3A48] uppercase transition-all hover:bg-[#5C3A48] hover:text-[#FAF8F5]"
            >
              Reservar
            </button>
          </li>
          <li className="pt-2">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 font-[family-name:var(--font-inter)] text-xs font-light tracking-widest text-[#B5A8AC] uppercase transition-colors hover:text-[#5C3A48]"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              Acceso administrador
            </Link>
          </li>
        </ul>
      </div>
      </header>

      {reservarOpen && (
        <ReservarModal onClose={() => setReservarOpen(false)} />
      )}
    </>
  );
}
