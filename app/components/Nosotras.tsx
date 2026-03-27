"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useAdmin } from "@/app/context/AdminContext";
import { PencilBtn, InlineEditModal, get, type ContentMap, type Field } from "@/app/components/ui/InlineEdit";

export interface Cert {
  year: string;
  type: string;
  title: string;
  institution: string;
  imagen: string;
}

const DEFAULT_CERTS: Cert[] = [
  { year: "2024", type: "Certificación internacional", title: "Master Inyector — Toxina Botulínica y Rellenos", institution: "Laboratorio Flamamed", imagen: "" },
  { year: "2024", type: "Certificación internacional", title: "Certificación SkinCoach", institution: "Stand Lift. S.A.", imagen: "" },
  { year: "2017", type: "Título", title: "Medicina General", institution: "Universidad de Guayaquil, Ecuador", imagen: "" },
];

const DEFAULTS: ContentMap = {
  nosotras_eyebrow:       "Quién te cuida",
  nosotras_titulo:        "Nosotras",
  nosotras_foto_url:      "https://lh3.googleusercontent.com/d/1oIXBfnjk5xP8eP8iFedYjXNICgvhVZ_7",
  nosotras_rol:           "Fundadora & Directora médica",
  nosotras_nombre1:       "Dra. Solange",
  nosotras_nombre2:       "Ballen Marín",
  nosotras_bio1:          "Médico cirujana con formación especializada en medicina estética y técnicas de inyección avanzada. Su enfoque combina el rigor científico con una mirada estética natural, priorizando siempre la salud y armonía de sus pacientes.",
  nosotras_bio2:          "Cada tratamiento es diseñado de forma personalizada, partiendo de un diagnóstico preciso y una escucha activa. La meta no es cambiar, sino revelar la mejor versión de cada persona.",
  nosotras_cita:          '"Mi objetivo es que cada paciente salga sintiéndose más ella misma, no diferente."',
  nosotras_badge_label:   "Certificación",
  nosotras_badge_valor:   "Master Inyector ✦",
  nosotras_certs_eyebrow: "Formación académica",
  nosotras_certs_titulo:  "Estudios y certificaciones",
};

type EditingSection = "header" | "perfil" | "bio" | "badge" | "certs_header" | null;

const MODALS: Record<NonNullable<EditingSection>, { title: string; fields: Field[] }> = {
  header: {
    title: "Encabezado de sección",
    fields: [
      { key: "nosotras_eyebrow", label: "Eyebrow" },
      { key: "nosotras_titulo",  label: "Título" },
    ],
  },
  perfil: {
    title: "Perfil de la doctora",
    fields: [
      { key: "nosotras_rol",     label: "Rol / cargo" },
      { key: "nosotras_nombre1", label: "Nombre — línea 1" },
      { key: "nosotras_nombre2", label: "Nombre — línea 2" },
    ],
  },
  bio: {
    title: "Biografía y cita",
    fields: [
      { key: "nosotras_bio1", label: "Párrafo 1", multiline: true },
      { key: "nosotras_bio2", label: "Párrafo 2", multiline: true },
      { key: "nosotras_cita", label: "Cita (blockquote)", multiline: true },
    ],
  },
  badge: {
    title: "Badge flotante sobre la foto",
    fields: [
      { key: "nosotras_badge_label", label: "Etiqueta" },
      { key: "nosotras_badge_valor", label: "Valor" },
    ],
  },
  certs_header: {
    title: "Encabezado — Certificaciones",
    fields: [
      { key: "nosotras_certs_eyebrow", label: "Eyebrow" },
      { key: "nosotras_certs_titulo",  label: "Título" },
    ],
  },
};

function buildFileName(original: string) {
  const ext = original.split(".").pop() ?? "jpg";
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
}

function CertEditModal({
  cert,
  onClose,
  onSave,
}: {
  cert: Cert;
  onClose: () => void;
  onSave: (updated: Pick<Cert, "year" | "type" | "title" | "institution">) => Promise<void>;
}) {
  const [values, setValues] = useState({ year: cert.year, type: cert.type, title: cert.title, institution: cert.institution });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSave() {
    setSaving(true);
    await onSave(values);
    setSaving(false);
  }

  const inputCls = "w-full rounded-xl border border-[#E8C9C1] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#2C2329] outline-none transition focus:border-[#8B5E6D] font-[family-name:var(--font-inter)]";
  const fields: { key: keyof typeof values; label: string }[] = [
    { key: "year",        label: "Año" },
    { key: "type",        label: "Tipo (badge)" },
    { key: "title",       label: "Título" },
    { key: "institution", label: "Institución" },
  ];

  return (
    <>
      <div className="fixed inset-0 z-[200] bg-[#2C2329]/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="fixed left-1/2 top-1/2 z-[201] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#FAF8F5] p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-light text-[#2C2329]">
            Editar certificación
          </h2>
          <button onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E8C9C1] text-[#7A6A6E] hover:bg-[#F2E4DF]">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {fields.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <span className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-widest text-[#7A6A6E] uppercase">
                {label}
              </span>
              <input
                type="text"
                className={inputCls}
                value={values[key]}
                onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))}
              />
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-3">
          <button onClick={onClose}
            className="flex-1 rounded-full border border-[#E8C9C1] py-2.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest text-[#7A6A6E] uppercase hover:border-[#D4A5A0]">
            Cancelar
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 rounded-full py-2.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest uppercase transition-opacity disabled:opacity-60"
            style={{ backgroundColor: "var(--deep-mauve)", color: "#fff" }}>
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </>
  );
}

export default function Nosotras() {
  const [content, setContent] = useState<ContentMap>(DEFAULTS);
  const [certs, setCerts] = useState<Cert[]>(DEFAULT_CERTS);
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState<EditingSection>(null);
  const [editingCertIdx, setEditingCertIdx] = useState<number | null>(null);

  const photoRef = useRef<HTMLInputElement>(null);
  const certImgRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data } = await supabase.from("contenido_sitio").select("clave, valor").eq("seccion", "nosotras");
      if (!mounted) return;
      if (data) {
        const map: ContentMap = {};
        for (const item of data) map[item.clave] = item.valor;
        setContent({ ...DEFAULTS, ...map });

        if (map.nosotras_certs_json) {
          try {
            const parsed: Cert[] = JSON.parse(map.nosotras_certs_json);
            // Migra imágenes desde filas individuales si el JSON las tiene vacías
            const migrated = parsed.map((cert, i) => {
              const oldImg = map[`nosotras_cert${i + 1}_imagen`];
              return (!cert.imagen && oldImg) ? { ...cert, imagen: oldImg } : cert;
            });
            setCerts(migrated);
          } catch { /* keep DEFAULT_CERTS */ }
        } else {
          // Sin JSON todavía: usa DEFAULT_CERTS con imágenes de filas individuales
          const migrated = DEFAULT_CERTS.map((cert, i) => {
            const oldImg = map[`nosotras_cert${i + 1}_imagen`];
            return oldImg ? { ...cert, imagen: oldImg } : cert;
          });
          setCerts(migrated);
        }
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  async function saveFields(updates: ContentMap) {
    const results = await Promise.all(
      Object.entries(updates).map(([clave, valor]) =>
        supabase.from("contenido_sitio").update({ valor }).eq("clave", clave)
      )
    );
    const failed = results.find(({ error }) => error);
    if (failed?.error) { console.error("[Nosotras] saveFields error:", failed.error.message); return; }
    setContent((prev) => ({ ...prev, ...updates }));
  }

  async function saveCerts(updated: Cert[]) {
    const { error } = await supabase
      .from("contenido_sitio")
      .upsert({ clave: "nosotras_certs_json", valor: JSON.stringify(updated), seccion: "nosotras", descripcion: "Certificaciones JSON" }, { onConflict: "clave" });
    if (error) { console.error("[Nosotras] saveCerts error:", error.message); return; }
    setCerts(updated);
  }

  async function handlePhotoUpload(file: File) {
    const fileName = buildFileName(file.name);
    const { error } = await supabase.storage.from("nosotras").upload(fileName, file, { upsert: false });
    if (error) { console.error("[Nosotras] Upload error:", error.message); return; }
    const { data: urlData } = supabase.storage.from("nosotras").getPublicUrl(fileName);
    await saveFields({ nosotras_foto_url: urlData.publicUrl });
    if (photoRef.current) photoRef.current.value = "";
  }

  async function handleCertImageUpload(file: File, idx: number) {
    const fileName = buildFileName(file.name);
    const { error } = await supabase.storage.from("nosotras").upload(fileName, file, { upsert: false });
    if (error) { console.error("[Nosotras] Upload error:", error.message); return; }
    const { data: urlData } = supabase.storage.from("nosotras").getPublicUrl(fileName);
    const updated = certs.map((c, i) => i === idx ? { ...c, imagen: urlData.publicUrl } : c);
    await saveCerts(updated);
    const ref = certImgRefs.current[idx];
    if (ref) ref.value = "";
  }

  const g = (key: string) => get(content, key, DEFAULTS);

  return (
    <section id="nosotras" className="bg-[#FAF8F5] pt-12 pb-6 lg:pt-16 lg:pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-1">
            <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase">
              {g("nosotras_eyebrow")}
            </span>
            {isAdmin && <PencilBtn onClick={() => setEditing("header")} />}
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] sm:text-5xl lg:text-6xl">
            {g("nosotras_titulo")}
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-[#D4A5A0]" />
        </div>

        {/* Profile block */}
        <div className="mb-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Photo */}
          <div className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div className="relative overflow-hidden rounded-[40px] aspect-[3/4]">
              <Image
                src={g("nosotras_foto_url")}
                alt={`${g("nosotras_nombre1")} ${g("nosotras_nombre2")} — Beauty Lab`}
                fill
                className="object-cover object-center"
                priority
              />
              <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-t from-[#2C2329]/20 to-transparent" />
            </div>

            {/* Floating credential badge */}
            <div className="absolute -bottom-5 -right-5 max-w-[200px] rounded-2xl bg-[#FAF8F5] px-5 py-4 shadow-xl">
              <p className="font-[family-name:var(--font-inter)] text-[10px] font-light tracking-wider text-[#B5A8AC] uppercase">
                {g("nosotras_badge_label")}
              </p>
              <div className="flex items-center gap-1">
                <p className="mt-0.5 font-[family-name:var(--font-cormorant)] text-base font-medium leading-tight text-[#5C3A48]">
                  {g("nosotras_badge_valor")}
                </p>
                {isAdmin && <PencilBtn onClick={() => setEditing("badge")} />}
              </div>
            </div>

            <div className="absolute -top-4 -left-4 h-24 w-1 rounded-full bg-gradient-to-b from-[#C9A96E] to-transparent" />

            {/* Photo upload button */}
            {isAdmin && (
              <label className="absolute top-3 right-3 flex cursor-pointer items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 shadow-sm transition-all hover:bg-white">
                <svg className="h-3 w-3 text-[#5C3A48]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-medium text-[#5C3A48]">
                  Cambiar foto
                </span>
                <input
                  ref={photoRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handlePhotoUpload(file);
                  }}
                />
              </label>
            )}
          </div>

          {/* Bio */}
          <div>
            <div className="flex items-center gap-1 mb-1">
              <p className="font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.25em] text-[#C9A96E] uppercase">
                {g("nosotras_rol")}
              </p>
              {isAdmin && <PencilBtn onClick={() => setEditing("perfil")} />}
            </div>
            <h3 className="mb-1 font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] lg:text-5xl">
              {g("nosotras_nombre1")}
            </h3>
            <h3 className="mb-6 font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#5C3A48] lg:text-5xl">
              {g("nosotras_nombre2")}
            </h3>

            <div className="mb-8 flex flex-wrap gap-2">
              {["Médico Cirujana", "Master Inyector Certificada", "Especialista en Medicina Estética", "Certificada en Toxina Botulínica", "Certificación SkinCoach"].map((c) => (
                <span key={c} className="rounded-full border border-[#E8C9C1] bg-white px-3 py-1.5 font-[family-name:var(--font-inter)] text-xs font-light text-[#7A6A6E]">
                  {c}
                </span>
              ))}
            </div>

            <p className="mb-6 font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E]">
              {g("nosotras_bio1")}
            </p>
            <p className="font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E]">
              {g("nosotras_bio2")}
            </p>

            <blockquote className="mt-8 border-l-2 border-[#C9A96E] pl-5">
              <div className="flex items-start gap-1">
                <p className="font-[family-name:var(--font-cormorant)] text-xl font-light italic text-[#5C3A48]">
                  {g("nosotras_cita")}
                </p>
                {isAdmin && <PencilBtn onClick={() => setEditing("bio")} />}
              </div>
            </blockquote>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="mb-10 flex items-center gap-6">
            <div>
              <div className="flex items-center gap-1">
                <p className="font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.25em] text-[#C9A96E] uppercase">
                  {g("nosotras_certs_eyebrow")}
                </p>
                {isAdmin && <PencilBtn onClick={() => setEditing("certs_header")} />}
              </div>
              <h3 className="mt-1 font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#2C2329]">
                {g("nosotras_certs_titulo")}
              </h3>
            </div>
            <div className="h-px flex-1 bg-[#E8C9C1]" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certs.map((cert, idx) => (
              <div key={idx}
                className="group relative flex flex-col rounded-2xl border border-[#E8C9C1]/60 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(92,58,72,0.08)]">

                <div className="mb-4 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#D4A5A0]">
                    {cert.year}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="rounded-full bg-[#F2E4DF] px-2.5 py-1 font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-wider text-[#8B5E6D] uppercase">
                      {cert.type}
                    </span>
                    {isAdmin && <PencilBtn onClick={() => setEditingCertIdx(idx)} />}
                  </div>
                </div>

                <div className="mb-4 h-px w-8 bg-[#C9A96E]" />

                <div className="mb-2 flex-1">
                  <h4 className="font-[family-name:var(--font-cormorant)] text-lg font-medium leading-snug text-[#2C2329]">
                    {cert.title}
                  </h4>

                  {cert.imagen && (
                    <div className="pointer-events-none absolute -top-2 right-4 z-50 w-72 overflow-hidden rounded-2xl border border-[#E8C9C1] bg-white opacity-0 shadow-2xl transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cert.imagen} alt={cert.title} className="w-full h-auto" />
                      <p className="border-t border-[#E8C9C1] px-3 py-2 text-center font-[family-name:var(--font-inter)] text-[10px] font-light text-[#B5A8AC]">
                        {cert.title}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-[family-name:var(--font-inter)] text-xs font-light text-[#B5A8AC]">
                    {cert.institution}
                  </p>

                  {isAdmin && (
                    <label className="flex cursor-pointer items-center gap-1 rounded-full border border-[#E8C9C1] px-2.5 py-1 transition-colors hover:border-[#C9A96E] hover:text-[#5C3A48]">
                      <svg className="h-3 w-3 text-[#B5A8AC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      <span className="font-[family-name:var(--font-inter)] text-[9px] font-medium text-[#B5A8AC]">
                        {cert.imagen ? "Cambiar" : "Subir imagen"}
                      </span>
                      <input
                        ref={(el) => { certImgRefs.current[idx] = el; }}
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleCertImageUpload(file, idx);
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            ))}
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

      {editingCertIdx !== null && (
        <CertEditModal
          cert={certs[editingCertIdx]}
          onClose={() => setEditingCertIdx(null)}
          onSave={async (updated) => {
            const next = certs.map((c, i) => i === editingCertIdx ? { ...c, ...updated } : c);
            await saveCerts(next);
            setEditingCertIdx(null);
          }}
        />
      )}
    </section>
  );
}
