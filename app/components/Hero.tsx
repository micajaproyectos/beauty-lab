"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAdmin } from "@/app/context/AdminContext";
import { PencilBtn, InlineEditModal, get, type ContentMap, type Field } from "@/app/components/ui/InlineEdit";

const DEFAULTS: ContentMap = {
  hero_eyebrow:        "Estética Facial Premium",
  hero_titulo:         "Tu ritual de belleza, redefinido.",
  hero_descripcion:    "Ciencia y naturaleza en perfecta armonía. Tratamientos personalizados diseñados para revelar la mejor versión de tu piel.",
  hero_stat1_valor:    "500+",
  hero_stat1_label:    "Clientas felices",
  hero_stat2_valor:    "15+",
  hero_stat2_label:    "Tratamientos",
  hero_stat3_valor:    "5★",
  hero_stat3_label:    "Valoración media",
  hero_imagen_texto:   "Belleza natural",
  hero_disponibilidad: "Esta semana ✦",
};

type EditingSection = "eyebrow" | "titulo" | "descripcion" | "stats" | "imagen_texto" | "disponibilidad" | null;

export default function Hero() {
  const [content, setContent] = useState<ContentMap>(DEFAULTS);
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState<EditingSection>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const { data } = await supabase.from("contenido_sitio").select("clave, valor").eq("seccion", "hero");
      if (!mounted) return;
      if (data) {
        const map: ContentMap = {};
        for (const item of data) map[item.clave] = item.valor;
        setContent({ ...DEFAULTS, ...map });
      }
    }

    load();
    return () => { mounted = false; };
  }, []);

  async function saveFields(updates: ContentMap) {
    const entries = Object.entries(updates);
    await Promise.all(
      entries.map(([clave, valor]) =>
        supabase
          .from("contenido_sitio")
          .update({ valor })
          .eq("clave", clave)
      )
    );
    setContent((prev) => ({ ...prev, ...updates }));
  }

  const g = (key: string) => get(content, key, DEFAULTS);

  const MODALS: Record<NonNullable<EditingSection>, { title: string; fields: Field[] }> = {
    eyebrow:      { title: "Texto destacado",    fields: [{ key: "hero_eyebrow",        label: "Eyebrow" }] },
    titulo:       { title: "Título principal",   fields: [{ key: "hero_titulo",          label: "Título (H1)" }] },
    descripcion:  { title: "Descripción",        fields: [{ key: "hero_descripcion",     label: "Descripción", multiline: true }] },
    imagen_texto: { title: "Texto en la imagen", fields: [{ key: "hero_imagen_texto",    label: "Texto sobre la imagen" }] },
    disponibilidad: { title: "Badge disponibilidad", fields: [{ key: "hero_disponibilidad", label: "Disponibilidad" }] },
    stats: {
      title: "Estadísticas",
      fields: [
        { key: "hero_stat1_valor", label: "Stat 1 — número" },
        { key: "hero_stat1_label", label: "Stat 1 — etiqueta" },
        { key: "hero_stat2_valor", label: "Stat 2 — número" },
        { key: "hero_stat2_label", label: "Stat 2 — etiqueta" },
        { key: "hero_stat3_valor", label: "Stat 3 — número" },
        { key: "hero_stat3_label", label: "Stat 3 — etiqueta" },
      ],
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FAF8F5]">

      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {/* Base orbs */}
        <div className="absolute -top-24 -right-24 h-[700px] w-[700px] rounded-full bg-[#F2E4DF]/70 blur-3xl" />
        <div className="absolute bottom-0 -left-32 h-[600px] w-[600px] rounded-full bg-[#E8C9C1]/40 blur-3xl" />
        {/* Central soft glow */}
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FDF5F0]/50 blur-3xl hero-breathe" />
        {/* Golden accent orb */}
        <div className="absolute right-[20%] top-[15%] h-[280px] w-[280px] rounded-full bg-[#C9A96E]/8 blur-2xl" />
        {/* Radial vignette from top-right */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_70%_10%,_rgba(242,228,223,0.7)_0%,_transparent_70%)]" />
      </div>

      {/* ── Decorative botanical SVG (large, corner) ─────────────────── */}
      <svg
        className="pointer-events-none absolute z-[2] -bottom-8 -left-8 h-80 w-80 opacity-[0.06]"
        viewBox="0 0 320 320" fill="none"
        aria-hidden="true"
      >
        <circle cx="160" cy="160" r="150" stroke="#5C3A48" strokeWidth="1" />
        <circle cx="160" cy="160" r="110" stroke="#C9A96E" strokeWidth="0.8" />
        <circle cx="160" cy="160" r="70"  stroke="#5C3A48" strokeWidth="0.6" />
        <line x1="160" y1="10"  x2="160" y2="310" stroke="#C9A96E" strokeWidth="0.6" />
        <line x1="10"  y1="160" x2="310" y2="160" stroke="#C9A96E" strokeWidth="0.6" />
        <line x1="54"  y1="54"  x2="266" y2="266" stroke="#5C3A48" strokeWidth="0.5" />
        <line x1="266" y1="54"  x2="54"  y2="266" stroke="#5C3A48" strokeWidth="0.5" />
        <circle cx="160" cy="10"  r="4" fill="#C9A96E" />
        <circle cx="160" cy="310" r="4" fill="#C9A96E" />
        <circle cx="10"  cy="160" r="4" fill="#C9A96E" />
        <circle cx="310" cy="160" r="4" fill="#C9A96E" />
      </svg>

      {/* ── Botanical top-right ───────────────────────────────────────── */}
      <svg
        className="pointer-events-none absolute z-[2] -top-6 right-[5%] h-56 w-56 opacity-[0.05]"
        viewBox="0 0 220 220" fill="none"
        aria-hidden="true"
      >
        <path d="M110 10 Q140 60 110 110 Q80 60 110 10Z"   stroke="#C9A96E" strokeWidth="1" fill="none" />
        <path d="M110 110 Q140 160 110 210 Q80 160 110 110Z" stroke="#C9A96E" strokeWidth="1" fill="none" />
        <path d="M10 110 Q60 80 110 110 Q60 140 10 110Z"   stroke="#5C3A48" strokeWidth="1" fill="none" />
        <path d="M110 110 Q160 80 210 110 Q160 140 110 110Z" stroke="#5C3A48" strokeWidth="1" fill="none" />
        <circle cx="110" cy="110" r="6" stroke="#C9A96E" strokeWidth="1" fill="none" />
        <circle cx="110" cy="10"  r="3" fill="#C9A96E" opacity="0.6" />
        <circle cx="110" cy="210" r="3" fill="#C9A96E" opacity="0.6" />
        <circle cx="10"  cy="110" r="3" fill="#5C3A48" opacity="0.6" />
        <circle cx="210" cy="110" r="3" fill="#5C3A48" opacity="0.6" />
      </svg>

      {/* ── Floating sparkles ────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        {/* Sparkle SVG helper */}
        {([
          { x: "18%",  y: "22%", size: 10, delay: "0s",    cls: "hero-sparkle" },
          { x: "78%",  y: "18%", size: 7,  delay: "1.1s",  cls: "hero-sparkle" },
          { x: "88%",  y: "55%", size: 12, delay: "0.5s",  cls: "hero-sparkle" },
          { x: "12%",  y: "68%", size: 8,  delay: "1.8s",  cls: "hero-sparkle" },
          { x: "55%",  y: "82%", size: 6,  delay: "0.9s",  cls: "hero-sparkle" },
          { x: "65%",  y: "12%", size: 9,  delay: "2.3s",  cls: "hero-sparkle" },
        ] as const).map(({ x, y, size, delay, cls }, i) => (
          <div key={i} className={`absolute ${cls}`} style={{ left: x, top: y, animationDelay: delay }}>
            <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
              <path d="M6 0L6.8 5.2L12 6L6.8 6.8L6 12L5.2 6.8L0 6L5.2 5.2L6 0Z" fill="#C9A96E" />
            </svg>
          </div>
        ))}
      </div>

      {/* ── Main layout ──────────────────────────────────────────────── */}
      <div className="relative z-[3] mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-16 px-6 pb-8 pt-32 lg:flex-row lg:gap-0 lg:px-12">

        {/* Left: Content */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">

          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-2">
            {/* Decorative dash */}
            <span className="hidden h-px w-8 bg-[#C9A96E] lg:block" />
            <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.35em] text-[#C9A96E] uppercase">
              {g("hero_eyebrow")}
            </span>
            {isAdmin && <PencilBtn onClick={() => setEditing("eyebrow")} />}
          </div>

          {/* Título */}
          <div className="mb-4 flex items-start gap-2">
            <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[1.08] text-[#2C2329] sm:text-6xl lg:text-7xl xl:text-[82px]">
              {g("hero_titulo")}
            </h1>
            {isAdmin && <PencilBtn onClick={() => setEditing("titulo")} />}
          </div>

          {/* Golden underline ornament */}
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#C9A96E] to-[#E8D5AC]" />
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 0L6.8 5.2L12 6L6.8 6.8L6 12L5.2 6.8L0 6L5.2 5.2L6 0Z" fill="#C9A96E" opacity="0.7" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-r from-[#E8D5AC] to-transparent" />
          </div>

          {/* Descripción */}
          <div className="mb-10 flex items-start gap-2">
            <p className="max-w-md font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E]">
              {g("hero_descripcion")}
            </p>
            {isAdmin && <PencilBtn onClick={() => setEditing("descripcion")} />}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a href="/servicios"
              className="group relative overflow-hidden rounded-full bg-[#5C3A48] px-8 py-3.5 font-[family-name:var(--font-inter)] text-sm font-medium tracking-widest text-[#FAF8F5] uppercase shadow-[0_8px_32px_rgba(92,58,72,0.3)] transition-all hover:bg-[#2C2329] hover:shadow-[0_12px_40px_rgba(92,58,72,0.4)]">
              <span className="relative z-10">Ver Tratamientos</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a href="/productos"
              className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm font-light tracking-wider text-[#7A6A6E] transition-colors hover:text-[#5C3A48]">
              Explorar Productos
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
            <p className="w-full text-center font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.12em] text-[#B8954A] drop-shadow-[0_0_20px_rgba(201,169,110,0.35)] sm:text-sm lg:text-left">
              Sobre $35.000 envío gratis.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-12 flex items-center gap-6 border-t border-[#E8C9C1] pt-8">
            {[
              { val: g("hero_stat1_valor"), lbl: g("hero_stat1_label") },
              { val: g("hero_stat2_valor"), lbl: g("hero_stat2_label") },
              { val: g("hero_stat3_valor"), lbl: g("hero_stat3_label") },
            ].map(({ val, lbl }, i) => (
              <div key={lbl} className="flex items-center gap-6">
                {i > 0 && (
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-3 w-px bg-[#E8C9C1]" />
                    <svg width="5" height="5" viewBox="0 0 12 12" fill="#C9A96E" opacity="0.5" aria-hidden="true">
                      <path d="M6 0L6.8 5.2L12 6L6.8 6.8L6 12L5.2 6.8L0 6L5.2 5.2L6 0Z" />
                    </svg>
                    <div className="h-3 w-px bg-[#E8C9C1]" />
                  </div>
                )}
                <div className="text-center">
                  <p className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#5C3A48]">{val}</p>
                  <p className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#7A6A6E]">{lbl}</p>
                </div>
              </div>
            ))}
            {isAdmin && <PencilBtn onClick={() => setEditing("stats")} />}
          </div>
        </div>

        {/* Right: Visual */}
        <div className="relative flex flex-1 items-center justify-center lg:justify-end">
          <div className="relative h-[420px] w-[340px] sm:h-[500px] sm:w-[400px] lg:h-[580px] lg:w-[460px]">

            {/* Outer decorative rings (concentric, offset) */}
            <div className="absolute inset-[-18px] rounded-[58px] border border-[#C9A96E]/18" />
            <div className="absolute inset-[-36px] rounded-[70px] border border-[#E8C9C1]/12" />

            {/* Floating orb behind card */}
            <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-[#F2E4DF]/60 blur-2xl hero-breathe" />
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-[#E8C9C1]/40 blur-2xl hero-float" />

            {/* Main card */}
            <div className="absolute inset-0 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#E8C9C1] via-[#D4A5A0] to-[#8B5E6D] shadow-[0_32px_80px_rgba(92,58,72,0.25)]">
              {/* Video de fondo de la tarjeta */}
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden
                src="/videos/hero_tarjeta.mp4"
              />
              {/* Subtle gradient overlay always on top of video */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2329]/50 via-transparent to-[#5C3A48]/10 rounded-[40px]" />

              {/* Imagen texto */}
              <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-center">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <div className="h-px w-8 bg-white/40" />
                  <svg width="6" height="6" viewBox="0 0 12 12" fill="white" opacity="0.5" aria-hidden="true">
                    <path d="M6 0L6.8 5.2L12 6L6.8 6.8L6 12L5.2 6.8L0 6L5.2 5.2L6 0Z" />
                  </svg>
                  <div className="h-px w-8 bg-white/40" />
                </div>
                <div className="flex items-center gap-1 justify-center">
                  <p className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-white/85 italic drop-shadow-md">
                    {g("hero_imagen_texto")}
                  </p>
                  {isAdmin && (
                    <button onClick={() => setEditing("imagen_texto")} title="Editar"
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-[#5C3A48] transition hover:bg-white">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Corner gold accent */}
              <div className="absolute bottom-0 right-0 h-20 w-20 overflow-hidden rounded-[40px]">
                <div className="absolute bottom-3 right-3 h-12 w-12 rounded-full bg-[#C9A96E]/20 blur-md" />
              </div>
            </div>

            {/* Floating availability badge */}
            <div className="hero-float absolute -bottom-6 -left-6 flex items-center gap-1 rounded-2xl bg-[#FAF8F5] px-4 py-2.5 shadow-[0_16px_48px_rgba(92,58,72,0.15)] ring-1 ring-[#E8C9C1]/60">
              <p className="font-[family-name:var(--font-cormorant)] text-lg font-medium text-[#5C3A48]">
                {g("hero_disponibilidad")}
              </p>
              {isAdmin && <PencilBtn onClick={() => setEditing("disponibilidad")} />}
            </div>

            {/* Premium Care tag */}
            <div className="hero-float-slow absolute -top-4 -right-4 overflow-hidden rounded-xl bg-gradient-to-br from-[#C9A96E] to-[#A88548] px-4 py-2 shadow-[0_8px_24px_rgba(201,169,110,0.4)]">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 hover:translate-x-full" />
              <p className="relative font-[family-name:var(--font-inter)] text-xs font-medium tracking-wider text-white">
                Premium Care
              </p>
            </div>

            {/* Small floating sparkle near card */}
            <div className="hero-sparkle absolute top-[12%] -left-7" style={{ animationDelay: "1.4s" }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M6 0L6.8 5.2L12 6L6.8 6.8L6 12L5.2 6.8L0 6L5.2 5.2L6 0Z" fill="#C9A96E" opacity="0.6" />
              </svg>
            </div>
            <div className="hero-sparkle absolute bottom-[20%] -right-7" style={{ animationDelay: "2.1s" }}>
              <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                <path d="M6 0L6.8 5.2L12 6L6.8 6.8L6 12L5.2 6.8L0 6L5.2 5.2L6 0Z" fill="#C9A96E" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 z-[3] -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="h-10 w-px animate-pulse bg-gradient-to-b from-[#C9A96E] to-transparent" />
        <span className="font-[family-name:var(--font-inter)] text-[9px] tracking-[0.3em] text-[#C9A96E]/60 uppercase">
          scroll
        </span>
      </div>

      {/* Inline edit modals */}
      {editing && (
        <InlineEditModal
          {...MODALS[editing]}
          content={content}
          defaults={DEFAULTS}
          onClose={() => setEditing(null)}
          onSave={saveFields}
        />
      )}
    </section>
  );
}
