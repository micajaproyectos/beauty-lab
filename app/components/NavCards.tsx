"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useAdmin } from "@/app/context/AdminContext";
import { PencilBtn, InlineEditModal, get, type ContentMap, type Field } from "@/app/components/ui/InlineEdit";

const DEFAULTS: ContentMap = {
  navcards_label:          "¿Por dónde empezamos?",
  navcards_c1_eyebrow:     "Agenda tu cita",
  navcards_c1_heading:     "Estética Facial Premium",
  navcards_c1_description: "Toxina botulínica, ácido hialurónico, bioestimulación, hilos tensores y más. Todos a cotizar de forma personalizada.",
  navcards_c1_tag:         "6 tratamientos disponibles",
  navcards_c1_cta:         "Ver tratamientos",
  navcards_c2_eyebrow:     "Compra online",
  navcards_c2_heading:     "Dermocosmética Coreana",
  navcards_c2_subtitle:    "K-Beauty",
  navcards_c2_description: "Marcas coreanas de alta eficacia: protectores solares, hidratantes y tratamientos para tu rutina de skincare.",
  navcards_c2_tag:         "17+ productos",
  navcards_c2_cta:         "Ver catálogo",
  navcards_sc_eyebrow:     "Servicio exclusivo · Asesoría personalizada",
  navcards_sc_heading:     "SkinCoach",
  navcards_sc_description: "Diagnóstico de piel, revisión de rutina y un plan de tratamiento diseñado 100% para ti. La guía que necesitas para cuidar tu piel con criterio médico.",
  navcards_note:           "El carrito funciona en todas las secciones — agrega tratamientos y productos a la vez",
};

type EditingSection = "label" | "c1" | "c2" | "skincoach" | "note" | null;

const MODALS: Record<NonNullable<EditingSection>, { title: string; fields: Field[] }> = {
  label: {
    title: "Separador de sección",
    fields: [{ key: "navcards_label", label: "Texto del separador" }],
  },
  c1: {
    title: "Card — Tratamientos",
    fields: [
      { key: "navcards_c1_eyebrow",     label: "Eyebrow" },
      { key: "navcards_c1_heading",     label: "Título" },
      { key: "navcards_c1_description", label: "Descripción", multiline: true },
      { key: "navcards_c1_tag",         label: "Badge superior" },
      { key: "navcards_c1_cta",         label: "Texto CTA" },
    ],
  },
  c2: {
    title: "Card — Skincare",
    fields: [
      { key: "navcards_c2_eyebrow",     label: "Eyebrow" },
      { key: "navcards_c2_heading",     label: "Título" },
      { key: "navcards_c2_subtitle",    label: "Subtítulo (K-Beauty)" },
      { key: "navcards_c2_description", label: "Descripción", multiline: true },
      { key: "navcards_c2_tag",         label: "Badge superior" },
      { key: "navcards_c2_cta",         label: "Texto CTA" },
    ],
  },
  skincoach: {
    title: "Banner — SkinCoach",
    fields: [
      { key: "navcards_sc_eyebrow",     label: "Eyebrow" },
      { key: "navcards_sc_heading",     label: "Título" },
      { key: "navcards_sc_description", label: "Descripción", multiline: true },
    ],
  },
  note: {
    title: "Nota al pie",
    fields: [{ key: "navcards_note", label: "Texto de la nota", multiline: true }],
  },
};

const card1Static = {
  href: "/servicios",
  gradient: "from-[#5C3A48] via-[#8B5E6D] to-[#D4A5A0]",
  accentColor: "text-[#E8C9C1]",
  icon: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  ),
};

const card2Static = {
  href: "/productos",
  gradient: "from-[#C9A96E] via-[#E8C9A0] to-[#F5E6D3]",
  accentColor: "text-[#5C3A48]",
  icon: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
};

export default function NavCards() {
  const [content, setContent] = useState<ContentMap>(DEFAULTS);
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState<EditingSection>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data } = await supabase.from("contenido_sitio").select("clave, valor").eq("seccion", "navcards");
      if (!mounted) return;
      if (data) {
        const map: ContentMap = {};
        for (const item of data) map[item.clave] = item.valor;
        setContent(map);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  async function saveFields(updates: ContentMap) {
    await Promise.all(
      Object.entries(updates).map(([clave, valor]) =>
        supabase.from("contenido_sitio").update({ valor }).eq("clave", clave)
      )
    );
    setContent((prev) => ({ ...prev, ...updates }));
  }

  const g = (key: string) => get(content, key, DEFAULTS);

  return (
    <section className="bg-[#FAF8F5] px-6 pb-16 pt-4 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section label */}
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#E8C9C1]" />
          <div className="flex items-center gap-1">
            <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-[0.3em] text-[#B5A8AC] uppercase">
              {g("navcards_label")}
            </span>
            {isAdmin && <PencilBtn onClick={() => setEditing("label")} />}
          </div>
          <div className="h-px flex-1 bg-[#E8C9C1]" />
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Card 1 — Tratamientos */}
          <Link href={card1Static.href} className="group relative flex flex-col overflow-hidden rounded-3xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${card1Static.gradient} transition-transform duration-700 group-hover:scale-105`} />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -top-8 -left-8 h-40 w-40 rounded-full bg-white/10" />
            <div className="relative flex flex-col p-8 sm:p-10 lg:p-12 min-h-[340px]">
              <div className="flex items-start justify-between">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm ${card1Static.accentColor}`}>
                  {card1Static.icon}
                </div>
                <div className="flex items-center gap-1">
                  <span className="rounded-full bg-white/20 px-3 py-1 font-[family-name:var(--font-inter)] text-[10px] font-light tracking-wider text-white backdrop-blur-sm">
                    {g("navcards_c1_tag")}
                  </span>
                  {isAdmin && <PencilBtn onClick={() => setEditing("c1")} />}
                </div>
              </div>
              <div className="mt-auto pt-12">
                <p className="mb-2 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[0.3em] text-white/60 uppercase">
                  {g("navcards_c1_eyebrow")}
                </p>
                <h2 className="mb-2 font-[family-name:var(--font-cormorant)] text-4xl font-light leading-[1.1] text-white sm:text-5xl">
                  {g("navcards_c1_heading")}
                </h2>
                <p className="max-w-sm font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-white/75">
                  {g("navcards_c1_description")}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <span className="font-[family-name:var(--font-inter)] text-sm font-medium tracking-widest text-white uppercase">
                  {g("navcards_c1_cta")}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white/30 backdrop-blur-sm">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>

          {/* Card 2 — Skincare */}
          <Link href={card2Static.href} className="group relative flex flex-col overflow-hidden rounded-3xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${card2Static.gradient} transition-transform duration-700 group-hover:scale-105`} />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -top-8 -left-8 h-40 w-40 rounded-full bg-white/10" />
            <div className="relative flex flex-col p-8 sm:p-10 lg:p-12 min-h-[340px]">
              <div className="flex items-start justify-between">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm ${card2Static.accentColor}`}>
                  {card2Static.icon}
                </div>
                <div className="flex items-center gap-1">
                  <span className="rounded-full bg-white/20 px-3 py-1 font-[family-name:var(--font-inter)] text-[10px] font-light tracking-wider text-white backdrop-blur-sm">
                    {g("navcards_c2_tag")}
                  </span>
                  {isAdmin && <PencilBtn onClick={() => setEditing("c2")} />}
                </div>
              </div>
              <div className="mt-auto pt-12">
                <p className="mb-2 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[0.3em] text-white/60 uppercase">
                  {g("navcards_c2_eyebrow")}
                </p>
                <h2 className="mb-2 font-[family-name:var(--font-cormorant)] text-4xl font-light leading-[1.1] text-white sm:text-5xl">
                  {g("navcards_c2_heading")}
                </h2>
                {g("navcards_c2_subtitle") && (
                  <p className="mb-4 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[0.3em] text-white/60 uppercase">
                    {g("navcards_c2_subtitle")}
                  </p>
                )}
                <p className="max-w-sm font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-white/75">
                  {g("navcards_c2_description")}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <span className="font-[family-name:var(--font-inter)] text-sm font-medium tracking-widest text-white uppercase">
                  {g("navcards_c2_cta")}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white/30 backdrop-blur-sm">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* SkinCoach banner */}
        <Link
          href="/servicios#skincoach"
          className="group relative mt-6 flex flex-col overflow-hidden rounded-3xl border border-[#E8C9C1]/60 bg-white sm:flex-row"
        >
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#C9A96E] via-[#D4A5A0] to-[#8B5E6D] rounded-l-3xl" />
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br from-[#F2E4DF] to-[#E8C9C1] opacity-40 transition-transform duration-700 group-hover:scale-110" />
          <div className="relative flex flex-col justify-center gap-4 p-8 pl-10 sm:flex-row sm:items-center sm:gap-10 lg:p-10 lg:pl-12">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F2E4DF] text-[#8B5E6D] transition-colors duration-300 group-hover:bg-[#E8C9C1]">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <p className="mb-1 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[0.3em] text-[#C9A96E] uppercase">
                  {g("navcards_sc_eyebrow")}
                </p>
                {isAdmin && <PencilBtn onClick={() => setEditing("skincoach")} />}
              </div>
              <h3 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#2C2329] sm:text-4xl">
                {g("navcards_sc_heading")}
              </h3>
              <p className="mt-2 max-w-lg font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">
                {g("navcards_sc_description")}
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-col items-start gap-3 sm:items-end">
              <div className="flex flex-wrap gap-2">
                {["Diagnóstico de piel", "Rutina personalizada", "Plan de tratamiento"].map((tag) => (
                  <span key={tag} className="rounded-full bg-[#F2E4DF] px-3 py-1 font-[family-name:var(--font-inter)] text-[10px] font-light text-[#8B5E6D]">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest text-[#5C3A48] uppercase">
                Conocer más
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Bottom note */}
        <div className="mt-8 flex items-center justify-center gap-1">
          <p className="text-center font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#B5A8AC]">
            {g("navcards_note")}
          </p>
          {isAdmin && <PencilBtn onClick={() => setEditing("note")} />}
        </div>
      </div>

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
