"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAdmin } from "@/app/context/AdminContext";
import { PencilBtn, InlineEditModal, get, type ContentMap, type Field } from "@/app/components/ui/InlineEdit";

const DEFAULTS: ContentMap = {
  bn_eyebrow: "¿Por qué elegirnos?",
  bn_titulo:  "La diferencia Beauty Lab",
  bn_b1_title:      "Ingredientes Naturales",
  bn_b1_desc:       "Formulados con extractos botánicos de origen certificado. Sin parabenos, sin sulfatos, sin crueldad animal.",
  bn_b1_stat:       "100%",
  bn_b1_stat_label: "Natural",
  bn_b2_title:      "Dermatológicamente Probado",
  bn_b2_desc:       "Todos nuestros protocolos y productos están avalados por dermatólogos. Tu seguridad es nuestra prioridad.",
  bn_b2_stat:       "Clín.",
  bn_b2_stat_label: "Testeado",
  bn_b3_title:      "Resultados Visibles",
  bn_b3_desc:       "El 94% de nuestras clientas nota una mejora visible en la textura y luminosidad de su piel desde la primera sesión.",
  bn_b3_stat:       "94%",
  bn_b3_stat_label: "Satisfacción",
  bn_b4_title:      "Atención Personalizada",
  bn_b4_desc:       "Cada visita comienza con un diagnóstico único. Adaptamos cada protocolo a tu tipo de piel y tus objetivos.",
  bn_b4_stat:       "1:1",
  bn_b4_stat_label: "Exclusivo",
  bn_testimonial:        '"Nunca pensé que mi piel pudiera sentirse tan bien. Beauty Lab cambió completamente mi rutina y mi confianza."',
  bn_testimonial_author: "VALENTINA R. — CLIENTA DESDE 2023",
};

type BNEditing = "header" | "b1" | "b2" | "b3" | "b4" | "testimonial" | null;

function makeBenefitModal(n: number, titleDefault: string): { title: string; fields: Field[] } {
  return {
    title: `Beneficio — ${titleDefault}`,
    fields: [
      { key: `bn_b${n}_title`,      label: "Título" },
      { key: `bn_b${n}_desc`,       label: "Descripción", multiline: true },
      { key: `bn_b${n}_stat`,       label: "Stat — valor" },
      { key: `bn_b${n}_stat_label`, label: "Stat — etiqueta" },
    ],
  };
}

const benefitIcons: React.ReactNode[] = [
  <svg key="b1" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" /></svg>,
  <svg key="b2" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  <svg key="b3" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  <svg key="b4" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
];

export default function Benefits() {
  const [content, setContent] = useState<ContentMap>(DEFAULTS);
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState<BNEditing>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data } = await supabase.from("contenido_sitio").select("clave, valor").eq("seccion", "benefits");
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

  const benefits = ([1, 2, 3, 4] as const).map((n) => ({
    n,
    title:     g(`bn_b${n}_title`),
    desc:      g(`bn_b${n}_desc`),
    stat:      g(`bn_b${n}_stat`),
    statLabel: g(`bn_b${n}_stat_label`),
    icon:      benefitIcons[n - 1],
    editKey:   `b${n}` as BNEditing,
  }));

  const editingModal = editing === "header"
    ? { title: "Encabezado de sección", fields: [
        { key: "bn_eyebrow", label: "Eyebrow" },
        { key: "bn_titulo",  label: "Título H2" },
      ] as Field[] }
    : editing === "testimonial"
    ? { title: "Testimonial", fields: [
        { key: "bn_testimonial",        label: "Cita",   multiline: true },
        { key: "bn_testimonial_author", label: "Autora / atribución" },
      ] as Field[] }
    : editing
    ? makeBenefitModal(Number(editing.slice(1)), g(`bn_${editing}_title`))
    : null;

  return (
    <section id="beneficios" className="relative overflow-hidden bg-[#5C3A48] py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#8B5E6D]/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-[#2C2329]/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-1">
            <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase">
              {g("bn_eyebrow")}
            </span>
            {isAdmin && <PencilBtn onClick={() => setEditing("header")} />}
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#FAF8F5] sm:text-5xl lg:text-6xl">
            {g("bn_titulo")}
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-[#C9A96E]/60" />
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.n}
              className="group relative flex flex-col items-start rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#C9A96E]/30 hover:bg-white/10">
              {isAdmin && (
                <button onClick={() => setEditing(benefit.editKey)}
                  className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white/70 transition hover:bg-white/40"
                  title="Editar">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                  </svg>
                </button>
              )}
              <div className="mb-4 flex items-baseline gap-1">
                <span className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#C9A96E]">
                  {benefit.stat}
                </span>
                <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]">
                  {benefit.statLabel}
                </span>
              </div>
              <div className="mb-4 text-[#E8C9C1] transition-colors group-hover:text-[#C9A96E]">
                {benefit.icon}
              </div>
              <h3 className="mb-3 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#FAF8F5]">
                {benefit.title}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#E8C9C1]/80">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
          <p className="mx-auto max-w-2xl font-[family-name:var(--font-cormorant)] text-2xl font-light italic text-[#FAF8F5]/90 sm:text-3xl">
            {g("bn_testimonial")}
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#C9A96E]/50" />
            <div className="flex items-center gap-1">
              <p className="font-[family-name:var(--font-inter)] text-xs font-light tracking-[0.2em] text-[#C9A96E]">
                {g("bn_testimonial_author")}
              </p>
              {isAdmin && <PencilBtn onClick={() => setEditing("testimonial")} />}
            </div>
            <div className="h-px w-12 bg-[#C9A96E]/50" />
          </div>
        </div>
      </div>

      {editing && editingModal && (
        <InlineEditModal
          {...editingModal}
          content={content}
          defaults={DEFAULTS}
          onClose={() => setEditing(null)}
          onSave={saveFields}
        />
      )}
    </section>
  );
}
