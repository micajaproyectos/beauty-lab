"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";
import { supabase } from "@/lib/supabaseClient";
import { checkIsAdmin } from "@/lib/checkAdmin";
import type { Tratamiento } from "@/lib/types";
import { PencilBtn, InlineEditModal, get, type ContentMap, type Field } from "@/app/components/ui/InlineEdit";

// ─── Editable content ─────────────────────────────────────────────────────────

const DEFAULTS: ContentMap = {
  sv_eyebrow:    "Nuestros Tratamientos",
  sv_titulo:     "Cuidado diario para tu piel",
  sv_descripcion:"Cada tratamiento es una experiencia sensorial diseñada con los mejores activos y la técnica más avanzada. Los valores se cotizan de forma personalizada.",
  sv_nota:       "Agrega los tratamientos que te interesan y te enviamos una cotización personalizada por WhatsApp.",
  sv_s1_title: "Toxina Botulínica",
  sv_s1_desc:  "Tratamiento médico estético para suavizar líneas de expresión y arrugas dinámicas. Resultados naturales que preservan tu expresividad.",
  sv_s1_tag:   "Popular",
  sv_s2_title: "Ácido Hialurónico",
  sv_s2_desc:  "Relleno dérmico de alta densidad para restaurar volumen facial, definir contornos y devolver la hidratación profunda a la piel.",
  sv_s2_tag:   "",
  sv_s3_title: "Bioestimulación",
  sv_s3_desc:  "Activa la producción natural de colágeno y elastina. Firmeza, elasticidad y luminosidad progresiva con activos biocompatibles.",
  sv_s3_tag:   "",
  sv_s4_title: "Hilos Tensores",
  sv_s4_desc:  "Lifting sin cirugía mediante hilos de sutura reabsorbibles. Redefine el óvalo facial y tensa la piel con resultados inmediatos y duraderos.",
  sv_s4_tag:   "Premium",
  sv_s5_title: "Hilos Revitalizantes",
  sv_s5_desc:  "Microinyección de hilos de polinucleótidos o vitaminas para revitalizar, iluminar y regenerar la piel desde adentro hacia afuera.",
  sv_s5_tag:   "",
  sv_s6_title: "SkinCoach",
  sv_s6_desc:  "Asesoría personalizada de skincare: diagnóstico de piel, revisión de rutina, selección de productos y plan de tratamiento a medida.",
  sv_s6_tag:   "Recomendado",
};

type SVEditing = "header" | "nota" | "s1" | "s2" | "s3" | "s4" | "s5" | "s6" | null;

function makeServiceModal(n: number, titleDefault: string): { title: string; fields: Field[] } {
  return {
    title: `Tarjeta — ${titleDefault}`,
    fields: [
      { key: `sv_s${n}_title`, label: "Nombre del tratamiento" },
      { key: `sv_s${n}_desc`,  label: "Descripción", multiline: true },
      { key: `sv_s${n}_tag`,   label: "Badge (vacío = sin badge)", hint: "Ej: Popular, Premium, Recomendado" },
    ],
  };
}

// ─── Zone option data ─────────────────────────────────────────────────────────

const zoneOptions = [
  {
    id: "1zona",
    label: "1 Zona",
    zones: ["Entrecejo", "Frente", "o Patas de gallo"],
    description: "Ideal para tratar un área puntual con precisión.",
  },
  {
    id: "2zonas",
    label: "2 Zonas",
    zones: ["Combinación de dos áreas", "Ej: frente + entrecejo"],
    description: "Mayor armonía facial trabajando dos zonas a la vez.",
  },
  {
    id: "3zonas",
    label: "3 Zonas",
    zones: ["Frente", "Entrecejo", "Patas de gallo"],
    description: "Tratamiento completo para un resultado equilibrado y natural.",
  },
];

// ─── Zone Modal ───────────────────────────────────────────────────────────────

function ZoneModal({ onClose, onSelect }: { onClose: () => void; onSelect: (zone: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleConfirm = () => {
    if (!selected) return;
    const option = zoneOptions.find((o) => o.id === selected)!;
    onSelect(option.label);
    onClose();
  };

  return createPortal(
    <>
      <div className="fixed inset-0 z-[200] bg-[#2C2329]/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" aria-labelledby="zone-modal-title"
        className="fixed left-1/2 top-1/2 z-[201] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[#FAF8F5] p-8 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[0.25em] text-[#C9A96E] uppercase">
              Toxina Botulínica
            </p>
            <h3 id="zone-modal-title" className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#2C2329]">
              ¿Cuántas zonas deseas tratar?
            </h3>
          </div>
          <button onClick={onClose}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#E8C9C1] text-[#7A6A6E] transition-colors hover:bg-[#F2E4DF]"
            aria-label="Cerrar">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {zoneOptions.map((option) => {
            const isActive = selected === option.id;
            return (
              <button key={option.id} onClick={() => setSelected(option.id)}
                className={`group w-full rounded-2xl border p-4 text-left transition-all duration-200 ${
                  isActive ? "border-[#5C3A48] bg-[#5C3A48]" : "border-[#E8C9C1] bg-white hover:border-[#D4A5A0] hover:bg-[#FDF7F5]"
                }`}>
                <div className="flex items-center justify-between">
                  <span className={`font-[family-name:var(--font-cormorant)] text-xl font-medium ${isActive ? "text-[#FAF8F5]" : "text-[#2C2329]"}`}>
                    {option.label}
                  </span>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                    isActive ? "border-white bg-white text-[#5C3A48]" : "border-[#D4A5A0]"
                  }`}>
                    {isActive && (
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {option.zones.map((z) => (
                    <span key={z} className={`rounded-full px-2.5 py-0.5 font-[family-name:var(--font-inter)] text-[10px] font-light ${
                      isActive ? "bg-white/15 text-[#F2E4DF]" : "bg-[#F2E4DF] text-[#8B5E6D]"
                    }`}>{z}</span>
                  ))}
                </div>
                <p className={`mt-2 font-[family-name:var(--font-inter)] text-xs font-light leading-relaxed ${
                  isActive ? "text-[#E8C9C1]" : "text-[#7A6A6E]"
                }`}>{option.description}</p>
              </button>
            );
          })}
        </div>

        <button onClick={handleConfirm} disabled={!selected}
          className="mt-5 w-full rounded-full bg-[#5C3A48] py-3.5 font-[family-name:var(--font-inter)] text-sm font-medium tracking-widest text-[#FAF8F5] uppercase shadow transition-all hover:bg-[#2C2329] disabled:cursor-not-allowed disabled:opacity-40">
          Agregar a cotización
        </button>
        <p className="mt-3 text-center font-[family-name:var(--font-inter)] text-[10px] font-light text-[#B5A8AC]">
          El valor se cotizará de forma personalizada
        </p>
      </div>
    </>,
    document.body
  );
}

// ─── Static service icons (no editables) ─────────────────────────────────────

const serviceIcons: Record<string, React.ReactNode> = {
  s1: <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  s2: <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 3c-4.418 0-8 4.03-8 9 0 3.866 2.239 7.19 5.5 8.478V21h5v-.522C17.761 19.19 20 15.866 20 12c0-4.97-3.582-9-8-9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 7v5l3 2" /></svg>,
  s3: <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>,
  s4: <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>,
  s5: <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  s6: <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
};

const SparkleIcon = () => (
  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
  </svg>
);

// ─── Quote button ─────────────────────────────────────────────────────────────

function QuoteButton({ id, title }: { id: string; title: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [showZoneModal, setShowZoneModal] = useState(false);

  const isToxina = id === "toxina-botulinica";

  const handleAdd = () => {
    if (isToxina) { setShowZoneModal(true); return; }
    addItem({ id, name: title, price: 0, type: "service" });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleZoneSelect = (zoneLabel: string) => {
    addItem({ id: `${id}-${zoneLabel.toLowerCase().replace(/\s/g, "-")}`, name: `${title} — ${zoneLabel}`, price: 0, type: "service" });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <button onClick={handleAdd}
        className={`rounded-full border px-4 py-1.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
          added ? "border-[#5C3A48] bg-[#5C3A48] text-white" : "border-[#8B5E6D] text-[#8B5E6D] hover:bg-[#8B5E6D] hover:text-white"
        }`}
        aria-label={`Cotizar ${title}`}>
        {added ? "✓ Agregado" : "Cotizar"}
      </button>
      {showZoneModal && <ZoneModal onClose={() => setShowZoneModal(false)} onSelect={handleZoneSelect} />}
    </>
  );
}

// ─── Services component ───────────────────────────────────────────────────────

export default function Services() {
  const { addItem } = useCart();
  const [dbTratamientos, setDbTratamientos] = useState<Tratamiento[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [added, setAdded] = useState<string | null>(null);
  const [content, setContent] = useState<ContentMap>(DEFAULTS);
  const [editing, setEditing] = useState<SVEditing>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const [adminStatus, { data: tratData }, { data: contentData }] = await Promise.all([
        checkIsAdmin(),
        supabase.from("tratamientos").select("*").order("orden").order("created_at"),
        supabase.from("contenido_sitio").select("clave, valor").eq("seccion", "services"),
      ]);
      if (!mounted) return;
      setIsAdmin(adminStatus);
      setDbTratamientos(tratData ?? []);
      if (contentData) {
        const map: ContentMap = {};
        for (const item of contentData) map[item.clave] = item.valor;
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

  function handleQuote(id: string, nombre: string) {
    addItem({ id, name: nombre, price: 0, type: "service" });
    setAdded(id);
    setTimeout(() => setAdded(null), 1500);
  }

  async function handleToggleTratamiento(t: Tratamiento) {
    const { data, error } = await supabase.from("tratamientos").update({ activo: !t.activo }).eq("id", t.id).select().single();
    if (!error && data) setDbTratamientos((prev) => prev.map((x) => (x.id === t.id ? (data as Tratamiento) : x)));
  }

  const visibleTratamientos = isAdmin ? dbTratamientos : dbTratamientos.filter((t) => t.activo);
  const g = (key: string) => get(content, key, DEFAULTS);

  // Build static services from content
  const staticServices = ([1, 2, 3, 4, 5, 6] as const).map((n) => ({
    n,
    id: ["toxina-botulinica", "acido-hialuronico", "bioestimulacion", "hilos-tensores", "hilos-revitalizantes", "skincoach"][n - 1],
    title: g(`sv_s${n}_title`),
    description: g(`sv_s${n}_desc`),
    tag: g(`sv_s${n}_tag`),
    icon: serviceIcons[`s${n}`],
    editKey: `s${n}` as SVEditing,
  }));

  const editingModal = editing && editing !== "header" && editing !== "nota"
    ? makeServiceModal(Number(editing.slice(1)), g(`sv_${editing}_title`))
    : editing === "header"
    ? { title: "Encabezado de sección", fields: [
        { key: "sv_eyebrow",     label: "Eyebrow" },
        { key: "sv_titulo",      label: "Título H2" },
        { key: "sv_descripcion", label: "Descripción", multiline: true },
      ] as Field[] }
    : editing === "nota"
    ? { title: "Nota al pie", fields: [{ key: "sv_nota", label: "Texto", multiline: true }] as Field[] }
    : null;

  return (
    <section id="servicios" className="bg-[#FAF8F5] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-1">
            <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase">
              {g("sv_eyebrow")}
            </span>
            {isAdmin && <PencilBtn onClick={() => setEditing("header")} />}
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] sm:text-5xl lg:text-6xl">
            {g("sv_titulo")}
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-[#D4A5A0]" />
          <p className="mx-auto mt-6 max-w-xl font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E]">
            {g("sv_descripcion")}
          </p>
        </div>

        {/* Admin banner */}
        {isAdmin && (
          <div className="mb-10 flex items-center justify-between rounded-2xl border border-[#C9A96E]/40 bg-[#C9A96E]/10 px-5 py-3">
            <div className="flex items-center gap-2.5">
              <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#C9A96E]" />
              <p className="font-[family-name:var(--font-inter)] text-xs text-[#5C3A48]">
                Modo administrador activo — haz clic en{" "}
                <span className="font-medium">Agregar tratamiento</span> para añadir uno nuevo
              </p>
            </div>
            <a href="/admin/tratamientos"
              className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-widest text-[#C9A96E] uppercase transition-colors hover:text-[#5C3A48]">
              Ir al panel →
            </a>
          </div>
        )}

        {/* Services grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Static hardcoded services */}
          {staticServices.map((service) => (
            <div key={service.id} id={service.id}
              className="group relative flex flex-col rounded-3xl border border-[#E8C9C1]/60 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(92,58,72,0.1)]">
              {service.tag && (
                <span className="absolute right-6 top-6 rounded-full bg-[#F2E4DF] px-3 py-1 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-wider text-[#8B5E6D] uppercase">
                  {service.tag}
                </span>
              )}
              {isAdmin && (
                <button onClick={() => setEditing(service.editKey)}
                  className="absolute left-6 top-6 flex h-7 w-7 items-center justify-center rounded-full border border-[#E8C9C1] bg-white text-[#8B5E6D] shadow-sm transition-all hover:bg-[#5C3A48] hover:text-white"
                  title="Editar tarjeta">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                  </svg>
                </button>
              )}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2E4DF] text-[#8B5E6D] transition-colors group-hover:bg-[#E8C9C1]">
                {service.icon}
              </div>
              <h3 className="mb-3 font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2C2329]">
                {service.title}
              </h3>
              <p className="flex-1 font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">
                {service.description}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-[#E8C9C1]/60 pt-5">
                <span className="font-[family-name:var(--font-inter)] text-xs font-light italic text-[#C9A96E]">A cotizar</span>
                <QuoteButton id={service.id} title={service.title} />
              </div>
            </div>
          ))}

          {/* DB treatments */}
          {visibleTratamientos.map((t) => (
            <div key={t.id}
              className={`group relative flex flex-col rounded-3xl border border-[#E8C9C1]/60 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(92,58,72,0.1)] ${!t.activo ? "opacity-50" : ""}`}>
              {isAdmin && (
                <button onClick={() => handleToggleTratamiento(t)}
                  title={t.activo ? "Ocultar de la web" : "Mostrar en la web"}
                  className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-[#E8C9C1] bg-white text-[#7A6A6E] shadow-sm transition-colors hover:bg-[#5C3A48] hover:text-white">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {t.activo
                      ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    }
                  </svg>
                </button>
              )}
              {isAdmin && !t.activo && (
                <span className="absolute left-6 top-6 rounded-full bg-gray-200 px-2.5 py-0.5 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-wider text-gray-500 uppercase">
                  Oculto
                </span>
              )}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2E4DF] text-[#8B5E6D] transition-colors group-hover:bg-[#E8C9C1]">
                <SparkleIcon />
              </div>
              <h3 className="mb-3 font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2C2329]">{t.nombre}</h3>
              <p className="flex-1 font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">{t.descripcion}</p>
              <div className="mt-6 flex items-center justify-between border-t border-[#E8C9C1]/60 pt-5">
                <span className="font-[family-name:var(--font-inter)] text-xs font-light italic text-[#C9A96E]">A cotizar</span>
                <button onClick={() => handleQuote(t.id, t.nombre)}
                  className={`rounded-full border px-4 py-1.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                    added === t.id ? "border-[#5C3A48] bg-[#5C3A48] text-white" : "border-[#8B5E6D] text-[#8B5E6D] hover:bg-[#8B5E6D] hover:text-white"
                  }`}>
                  {added === t.id ? "✓ Agregado" : "Cotizar"}
                </button>
              </div>
            </div>
          ))}

          {/* Admin: add treatment card */}
          {isAdmin && (
            <a href="/admin/tratamientos"
              className="group flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-[#E8C9C1] bg-white/50 transition-all duration-300 hover:border-[#C9A96E] hover:bg-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E8C9C1] text-[#C9A96E] transition-all group-hover:border-[#C9A96E] group-hover:bg-[#C9A96E]/10">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <span className="font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest text-[#B5A8AC] uppercase transition-colors group-hover:text-[#C9A96E]">
                Agregar tratamiento
              </span>
            </a>
          )}
        </div>

        {/* Bottom note */}
        <div className="mt-10 flex items-center justify-center gap-1">
          <p className="text-center font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#B5A8AC]">
            {g("sv_nota")}
          </p>
          {isAdmin && <PencilBtn onClick={() => setEditing("nota")} />}
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
