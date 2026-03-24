"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { checkIsAdmin } from "@/lib/checkAdmin";
import { PencilBtn, InlineEditModal, get, type ContentMap, type Field } from "@/app/components/ui/InlineEdit";

const DEFAULTS: ContentMap = {
  sh_eyebrow:     "Estética Facial Premium",
  sh_titulo:      "Nuestros",
  sh_titulo_em:   "tratamientos",
  sh_descripcion: "Cada tratamiento tiene un valor personalizado. Agrega los que te interesan y te enviamos una cotización directa por WhatsApp.",
  sh_stat1_value: "6",
  sh_stat1_label: "Tratamientos",
  sh_stat2_value: "A cotizar",
  sh_stat2_label: "Valor personalizado",
  sh_stat3_value: "1:1",
  sh_stat3_label: "Atención exclusiva",
  sh_stat4_value: "94%",
  sh_stat4_label: "Satisfacción",
};

type Editing = "header" | "stats" | null;

const MODALS: Record<NonNullable<Editing>, { title: string; fields: Field[] }> = {
  header: {
    title: "Hero — Servicios",
    fields: [
      { key: "sh_eyebrow",     label: "Eyebrow" },
      { key: "sh_titulo",      label: "Título — línea 1" },
      { key: "sh_titulo_em",   label: "Título — línea 2 (cursiva)" },
      { key: "sh_descripcion", label: "Descripción", multiline: true },
    ],
  },
  stats: {
    title: "Stats del hero",
    fields: [
      { key: "sh_stat1_value", label: "Stat 1 — valor" },
      { key: "sh_stat1_label", label: "Stat 1 — etiqueta" },
      { key: "sh_stat2_value", label: "Stat 2 — valor" },
      { key: "sh_stat2_label", label: "Stat 2 — etiqueta" },
      { key: "sh_stat3_value", label: "Stat 3 — valor" },
      { key: "sh_stat3_label", label: "Stat 3 — etiqueta" },
      { key: "sh_stat4_value", label: "Stat 4 — valor" },
      { key: "sh_stat4_label", label: "Stat 4 — etiqueta" },
    ],
  },
};

export default function ServiciosHero() {
  const [content, setContent] = useState<ContentMap>(DEFAULTS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editing, setEditing] = useState<Editing>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const [adminStatus, { data }] = await Promise.all([
        checkIsAdmin(),
        supabase.from("contenido_sitio").select("clave, valor").eq("seccion", "servicios_header"),
      ]);
      if (!mounted) return;
      setIsAdmin(adminStatus);
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
    <>
      <div className="relative overflow-hidden bg-[#5C3A48] pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-[#8B5E6D]/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-[#2C2329]/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <nav className="mb-8 flex items-center gap-2">
            <Link
              href="/"
              className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60 uppercase transition-colors hover:text-[#E8C9C1]"
            >
              Inicio
            </Link>
            <span className="text-[#E8C9C1]/40">/</span>
            <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#C9A96E] uppercase">
              Tratamientos
            </span>
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-1 mb-3">
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase">
                  {g("sh_eyebrow")}
                </span>
                {isAdmin && <PencilBtn onClick={() => setEditing("header")} />}
              </div>
              <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[1.1] text-[#FAF8F5] lg:text-6xl">
                {g("sh_titulo")}
                <br />
                <em className="text-[#E8C9C1]">{g("sh_titulo_em")}</em>
              </h1>
            </div>
            <p className="max-w-sm font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#E8C9C1]/70">
              {g("sh_descripcion")}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
            {[
              { value: g("sh_stat1_value"), label: g("sh_stat1_label") },
              { value: g("sh_stat2_value"), label: g("sh_stat2_label") },
              { value: g("sh_stat3_value"), label: g("sh_stat3_label") },
              { value: g("sh_stat4_value"), label: g("sh_stat4_label") },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-1.5">
                <span className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#C9A96E]">
                  {stat.value}
                </span>
                <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60">
                  {stat.label}
                </span>
              </div>
            ))}
            {isAdmin && <PencilBtn onClick={() => setEditing("stats")} />}
          </div>
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
    </>
  );
}
