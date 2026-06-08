"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAdmin } from "@/app/context/AdminContext";
import { PencilBtn, InlineEditModal, get, type ContentMap, type Field } from "@/app/components/ui/InlineEdit";

const DEFAULTS: ContentMap = {
  cta_eyebrow:          "Contáctanos",
  cta_titulo:           "¿Lista para empezar?",
  cta_descripcion:      "Escríbenos por Instagram o WhatsApp. Te respondemos a la brevedad.",
  cta_ig_url:           "https://www.instagram.com/beauty.lab.esteticafacial/",
  cta_ig_handle:        "@beauty.lab.esteticafacial",
  cta_ig_bio:           "Estética facial premium · Dermocosmética Coreana 🌸\nDra. Solange Ballen Marín · Master Inyector",
  cta_ig_prompt:        "Síguenos para ver tratamientos, resultados y tips de skincare diario.",
  cta_wa_numero:        "56933987534",
  cta_wa_numero_display:"+56 9 3398 7534",
  cta_wa_mensaje:       "Hola! Me gustaría obtener más información sobre sus tratamientos y productos.",
  cta_wa_descripcion:   "Escríbenos para agendar tu consulta, cotizar un tratamiento o resolver cualquier duda. Te respondemos a la brevedad.",
};

type EditingSection = "header" | "instagram" | "whatsapp" | null;

const MODALS: Record<NonNullable<EditingSection>, { title: string; fields: Field[] }> = {
  header: {
    title: "Encabezado del CTA",
    fields: [
      { key: "cta_eyebrow",     label: "Eyebrow" },
      { key: "cta_titulo",      label: "Título" },
      { key: "cta_descripcion", label: "Descripción", multiline: true },
    ],
  },
  instagram: {
    title: "Card — Instagram",
    fields: [
      { key: "cta_ig_url",    label: "URL del perfil",   hint: "https://www.instagram.com/..." },
      { key: "cta_ig_handle", label: "Handle (@usuario)" },
      { key: "cta_ig_bio",    label: "Bio de la card",   multiline: true },
      { key: "cta_ig_prompt", label: "Texto de seguimiento", multiline: true },
    ],
  },
  whatsapp: {
    title: "Card — WhatsApp",
    fields: [
      { key: "cta_wa_numero",         label: "Número (para link wa.me)",  hint: "Solo dígitos, ej: 56933987534" },
      { key: "cta_wa_numero_display", label: "Número (visible en pantalla)", hint: "Ej: +56 9 3398 7534" },
      { key: "cta_wa_mensaje",        label: "Mensaje pre-cargado",       multiline: true },
      { key: "cta_wa_descripcion",    label: "Descripción de la card",    multiline: true },
    ],
  },
};

export default function CTA() {
  const [content, setContent] = useState<ContentMap>(DEFAULTS);
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState<EditingSection>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data } = await supabase.from("contenido_sitio").select("clave, valor").eq("seccion", "cta");
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

  const waUrl = `https://wa.me/${g("cta_wa_numero")}?text=${encodeURIComponent(g("cta_wa_mensaje"))}`;

  return (
    <section id="cta" className="relative overflow-hidden bg-[#FAF8F5] py-12 lg:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-[#F2E4DF]/70 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-[#D4A5A0]" />
            <span className="text-[#C9A96E] text-xl">✦</span>
            <div className="h-px w-16 bg-[#D4A5A0]" />
          </div>
          <div className="flex items-center justify-center gap-1 mb-4">
            <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase">
              {g("cta_eyebrow")}
            </span>
            {isAdmin && <PencilBtn onClick={() => setEditing("header")} />}
          </div>
          <h2 className="mb-4 font-[family-name:var(--font-cormorant)] text-4xl font-light leading-[1.1] text-[#2C2329] sm:text-5xl lg:text-[60px]">
            {g("cta_titulo")}
          </h2>
          <p className="mx-auto max-w-md font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E]">
            {g("cta_descripcion")}
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid gap-6 sm:grid-cols-2">

          {/* Instagram card */}
          <a
            href={g("cta_ig_url")}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#E8C9C1]/60 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(92,58,72,0.12)]"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <div className="flex items-center gap-1">
                <span className="flex items-center gap-1.5 rounded-full bg-[#F2E4DF] px-3 py-1 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-wider text-[#8B5E6D] uppercase">
                  Seguir
                  <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </span>
                {isAdmin && <PencilBtn onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEditing("instagram"); }} />}
              </div>
            </div>

            <div className="mb-5 flex items-center gap-4">
              <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#E8C9C1] via-[#D4A5A0] to-[#8B5E6D] p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#FAF8F5]">
                  <span className="font-[family-name:var(--font-cormorant)] text-lg font-light text-[#5C3A48]">BL</span>
                </div>
              </div>
              <div>
                <p className="font-[family-name:var(--font-inter)] text-sm font-medium text-[#2C2329]">Beauty Lab</p>
                <p className="font-[family-name:var(--font-inter)] text-xs font-light text-[#7A6A6E]">{g("cta_ig_handle")}</p>
              </div>
            </div>

            <p className="mb-5 font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">
              {g("cta_ig_bio")}
            </p>

            <div className="mb-5 flex items-center gap-3 rounded-2xl bg-[#F2E4DF] px-4 py-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-xs font-light leading-relaxed text-[#7A6A6E]">
                {g("cta_ig_prompt")}
              </p>
            </div>

            <div className="flex items-center gap-2 border-t border-[#E8C9C1]/60 pt-5">
              <span className="font-[family-name:var(--font-inter)] text-xs font-medium tracking-wider text-[#5C3A48] uppercase">
                Ver perfil en Instagram
              </span>
              <svg className="h-3.5 w-3.5 text-[#5C3A48] transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </div>
          </a>

          {/* WhatsApp card */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#E8C9C1]/60 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(37,211,102,0.15)]"
            onClick={() => {
              if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
                (window as any).gtag("event", "conversion", { send_to: "AW-18082765966/JBPHCMmbprscEI65xK5D" });
              }
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366]">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="flex items-center gap-1">
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#25D366]">
                  <span className="animate-ping h-2.5 w-2.5 rounded-full bg-[#25D366] opacity-75" />
                </span>
                {isAdmin && <PencilBtn onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEditing("whatsapp"); }} />}
              </div>
            </div>

            <div className="mb-5">
              <p className="mb-1 font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.2em] text-[#25D366] uppercase">
                WhatsApp · Disponible
              </p>
              <h3 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#2C2329]">
                {g("cta_wa_numero_display")}
              </h3>
            </div>

            <p className="mb-6 flex-1 font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">
              {g("cta_wa_descripcion")}
            </p>

            <div className="mb-6 space-y-2">
              {["Quiero cotizar un tratamiento", "Consulta sobre productos", "Agendar una cita"].map((prompt) => (
                <div key={prompt} className="flex items-center gap-2 rounded-xl bg-[#F2E4DF] px-4 py-2.5">
                  <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#25D366]" />
                  <span className="font-[family-name:var(--font-inter)] text-xs font-light text-[#7A6A6E]">{prompt}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 border-t border-[#E8C9C1]/60 pt-5">
              <div className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 font-[family-name:var(--font-inter)] text-sm font-medium tracking-widest text-white uppercase shadow transition-all group-hover:bg-[#1ebe5d] group-hover:shadow-lg">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escribir ahora
              </div>
            </div>
          </a>
        </div>

        {/* Reassurance */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-center">
          {["Sin costo de consulta", "Respuesta inmediata", "Atención personalizada"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="text-[#C9A96E]">✓</span>
              <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#7A6A6E]">{item}</span>
            </div>
          ))}
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
