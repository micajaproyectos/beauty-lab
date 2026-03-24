"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { checkIsAdmin } from "@/lib/checkAdmin";
import type { Cert } from "@/app/components/Nosotras";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildFileName(original: string): string {
  const ext = original.split(".").pop() ?? "jpg";
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
}

const EMPTY_CERT: Cert = { year: "", type: "", title: "", institution: "", imagen: "" };

const inputCls =
  "w-full rounded-xl border border-[#E8C9C1] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#2C2329] outline-none transition focus:border-[#8B5E6D] font-[family-name:var(--font-inter)]";

const labelEl = (text: string) => (
  <span className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-widest text-[#7A6A6E] uppercase">
    {text}
  </span>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NosotrasAdminPage() {
  const router = useRouter();
  const [certs, setCerts] = useState<Cert[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let mounted = true;
    async function init() {
      const isAdmin = await checkIsAdmin();
      if (!isAdmin) { router.replace("/login"); return; }

      const { data } = await supabase
        .from("contenido_sitio")
        .select("valor")
        .eq("clave", "nosotras_certs_json")
        .maybeSingle();

      if (!mounted) return;
      if (data?.valor) {
        try { setCerts(JSON.parse(data.valor)); } catch { setCerts([]); }
      }
      setLoading(false);
    }
    init();
    return () => { mounted = false; };
  }, [router]);

  function updateCert(idx: number, field: keyof Cert, value: string) {
    setCerts((prev) => prev.map((c, i) => i === idx ? { ...c, [field]: value } : c));
  }

  function addCert() {
    setCerts((prev) => [...prev, { ...EMPTY_CERT }]);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 50);
  }

  function removeCert(idx: number) {
    setCerts((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleImageUpload(file: File, idx: number) {
    setUploadingIdx(idx);
    setStatus(null);
    const fileName = buildFileName(file.name);
    const { error } = await supabase.storage
      .from("nosotras")
      .upload(fileName, file, { upsert: false });

    if (error) {
      setStatus({ type: "error", text: `Error al subir imagen: ${error.message}` });
      setUploadingIdx(null);
      return;
    }

    const { data: urlData } = supabase.storage.from("nosotras").getPublicUrl(fileName);
    updateCert(idx, "imagen", urlData.publicUrl);
    setUploadingIdx(null);
    const ref = fileInputRefs.current[idx];
    if (ref) ref.value = "";
  }

  function removeImage(idx: number) {
    updateCert(idx, "imagen", "");
  }

  async function handleSave() {
    setSaving(true);
    setStatus(null);

    const { error } = await supabase
      .from("contenido_sitio")
      .upsert(
        { clave: "nosotras_certs_json", valor: JSON.stringify(certs), seccion: "nosotras", descripcion: "Certificaciones en formato JSON" },
        { onConflict: "clave" }
      );

    if (error) {
      setStatus({ type: "error", text: `Error al guardar: ${error.message}` });
    } else {
      setStatus({ type: "success", text: "Certificaciones guardadas correctamente." });
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--cream)" }}>
        <p className="font-[family-name:var(--font-inter)] text-sm tracking-widest uppercase" style={{ color: "var(--warm-muted)" }}>
          Cargando...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12" style={{ backgroundColor: "var(--cream)" }}>
      <div className="mx-auto max-w-2xl space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/admin"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#E8C9C1] text-[#7A6A6E] transition-colors hover:bg-[#F2E4DF]"
            aria-label="Volver al panel">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
          </Link>
          <div className="flex-1">
            <p className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[0.3em] text-[#C9A96E] uppercase">
              Panel Admin
            </p>
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl font-light" style={{ color: "var(--deep-mauve)" }}>
              Certificaciones
            </h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full px-5 py-2.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: "var(--deep-mauve)", color: "#fff" }}
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>

        {/* Status */}
        {status && (
          <p className={`rounded-xl px-4 py-3 font-[family-name:var(--font-inter)] text-xs ${
            status.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
          }`}>
            {status.text}
          </p>
        )}

        {/* Cert cards */}
        {certs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#E8C9C1] bg-white p-8 text-center">
            <p className="font-[family-name:var(--font-inter)] text-sm text-[#B5A8AC]">
              No hay certificaciones. Agrega la primera con el botón de abajo.
            </p>
          </div>
        )}

        {certs.map((cert, idx) => (
          <div key={idx} className="rounded-2xl border border-[#E8C9C1] bg-white p-6 space-y-4">

            {/* Card header */}
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest text-[#C9A96E] uppercase">
                Certificación {idx + 1}
              </span>
              <button
                type="button"
                onClick={() => removeCert(idx)}
                className="flex items-center gap-1 rounded-full border border-[#E8C9C1] px-3 py-1 font-[family-name:var(--font-inter)] text-[10px] text-[#B5A8AC] transition-colors hover:border-red-200 hover:text-red-400"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Eliminar
              </button>
            </div>

            {/* Fields grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                {labelEl("Año")}
                <input type="text" className={inputCls} placeholder="2024"
                  value={cert.year}
                  onChange={(e) => updateCert(idx, "year", e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                {labelEl("Tipo (badge)")}
                <input type="text" className={inputCls} placeholder="Certificación internacional"
                  value={cert.type}
                  onChange={(e) => updateCert(idx, "type", e.target.value)} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              {labelEl("Título")}
              <input type="text" className={inputCls} placeholder="Nombre del curso o título"
                value={cert.title}
                onChange={(e) => updateCert(idx, "title", e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              {labelEl("Institución")}
              <input type="text" className={inputCls} placeholder="Universidad o institución emisora"
                value={cert.institution}
                onChange={(e) => updateCert(idx, "institution", e.target.value)} />
            </div>

            {/* Image */}
            <div className="flex flex-col gap-2">
              {labelEl("Imagen del certificado (opcional)")}

              {cert.imagen && (
                <div className="relative overflow-hidden rounded-xl border border-[#E8C9C1]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cert.imagen} alt={cert.title} className="max-h-40 w-full object-contain bg-[#FAF8F5]" />
                </div>
              )}

              <div className="flex gap-3">
                <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#D4A5A0] px-4 py-3 transition-colors hover:border-[#8B5E6D]">
                  <svg className="h-4 w-4 flex-shrink-0 text-[#8B5E6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <span className="font-[family-name:var(--font-inter)] text-xs text-[#7A6A6E]">
                    {uploadingIdx === idx ? "Subiendo..." : cert.imagen ? "Cambiar imagen" : "Subir imagen"}
                  </span>
                  <input
                    ref={(el) => { fileInputRefs.current[idx] = el; }}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    disabled={uploadingIdx !== null}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, idx);
                    }}
                  />
                </label>

                {cert.imagen && (
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="rounded-xl border border-[#E8C9C1] px-4 font-[family-name:var(--font-inter)] text-xs text-[#B5A8AC] transition-colors hover:border-red-200 hover:text-red-400"
                  >
                    Quitar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Add cert button */}
        <button
          type="button"
          onClick={addCert}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#C9A96E] py-4 font-[family-name:var(--font-inter)] text-sm text-[#C9A96E] transition-colors hover:bg-[#FAF8F5]"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Agregar certificación
        </button>

        {/* Save bottom */}
        <div className="flex justify-end pb-8">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full px-8 py-3 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: "var(--deep-mauve)", color: "#fff" }}
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>

      </div>
    </main>
  );
}
