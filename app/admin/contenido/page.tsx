"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { checkIsAdmin } from "@/lib/checkAdmin";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContenidoItem {
  id: string;
  clave: string;
  valor: string;
  descripcion: string;
  seccion: string;
}

type ContentMap = Record<string, string>;

/** Clave en `contenido_sitio` para la URL del MP4 de fondo del hero */
const HERO_VIDEO_CLAVE = "hero_video_url";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildUniqueFileName(original: string): string {
  const ext = original.split(".").pop() ?? "jpg";
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
}

const inputCls =
  "w-full rounded-xl border border-[#E8C9C1] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#2C2329] outline-none transition focus:border-[#8B5E6D] font-[family-name:var(--font-inter)]";

const labelEl = (text: string, hint?: string) => (
  <div className="flex flex-col gap-0.5">
    <span className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-widest text-[#7A6A6E] uppercase">
      {text}
    </span>
    {hint && (
      <span className="font-[family-name:var(--font-inter)] text-[10px] text-[#B5A8AC]">{hint}</span>
    )}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContenidoAdminPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState<ContentMap>({});
  const [items, setItems] = useState<ContenidoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      const isAdmin = await checkIsAdmin();
      if (!isAdmin) { router.replace("/login"); return; }

      const { data, error } = await supabase
        .from("contenido_sitio")
        .select("*")
        .eq("seccion", "hero")
        .order("clave");

      if (!mounted) return;
      if (error) { console.error("[Contenido]", error.message); }
      else {
        setItems(data ?? []);
        const map: ContentMap = {};
        for (const item of (data ?? [])) map[item.clave] = item.valor;
        setContent(map);
        if (map.hero_imagen_url) setImagePreview(map.hero_imagen_url);
      }
      setLoading(false);
    }

    init();
    return () => { mounted = false; };
  }, [router]);

  function handleChange(clave: string, valor: string) {
    setContent((prev) => ({ ...prev, [clave]: valor }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    setSaving(true);
    setStatus(null);

    try {
      let finalContent = { ...content };

      // Upload image if selected
      if (imageFile) {
        const fileName = buildUniqueFileName(imageFile.name);
        const { error: uploadError } = await supabase.storage
          .from("hero")
          .upload(fileName, imageFile, { upsert: false });

        if (uploadError) {
          setStatus({ type: "error", text: `Error al subir imagen: ${uploadError.message}` });
          setSaving(false);
          return;
        }

        const { data: urlData } = supabase.storage.from("hero").getPublicUrl(fileName);
        finalContent.hero_imagen_url = urlData.publicUrl;
        setImagePreview(urlData.publicUrl);
        setImageFile(null);
        if (fileRef.current) fileRef.current.value = "";
      }

      // Upsert all content fields (sin `id` en filas nuevas → insert)
      const upsertData: Array<{
        id?: string;
        clave: string;
        valor: string;
        descripcion: string;
        seccion: string;
      }> = items.map((item) => ({
        id: item.id,
        clave: item.clave,
        valor: finalContent[item.clave] ?? item.valor,
        descripcion: item.descripcion,
        seccion: item.seccion,
      }));

      const tieneVideoEnDb = items.some((i) => i.clave === HERO_VIDEO_CLAVE);
      if (!tieneVideoEnDb) {
        upsertData.push({
          clave: HERO_VIDEO_CLAVE,
          valor: finalContent[HERO_VIDEO_CLAVE] ?? "",
          descripcion:
            "URL del video de fondo del hero (MP4). Vacío: variable de entorno o archivo local.",
          seccion: "hero",
        });
      }

      const { error: upsertError } = await supabase
        .from("contenido_sitio")
        .upsert(upsertData, { onConflict: "clave" });

      if (upsertError) {
        setStatus({ type: "error", text: `Error al guardar: ${upsertError.message}` });
      } else {
        setContent(finalContent);
        setStatus({ type: "success", text: "Contenido guardado correctamente." });
        const { data: refreshed } = await supabase
          .from("contenido_sitio")
          .select("*")
          .eq("seccion", "hero")
          .order("clave");
        if (refreshed) setItems(refreshed);
      }
    } catch (err) {
      console.error("[Contenido] Error inesperado:", err);
      setStatus({ type: "error", text: "Ocurrió un error inesperado." });
    } finally {
      setSaving(false);
    }
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
      <div className="mx-auto max-w-2xl space-y-8">

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
              Contenido — Hero
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

        {/* Video de fondo */}
        <div className="rounded-2xl border border-[#E8C9C1] bg-white p-6 space-y-5">
          <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-light" style={{ color: "var(--deep-mauve)" }}>
            Video de fondo
          </h2>
          <div className="flex flex-col gap-1.5">
            {labelEl(
              "URL del video (MP4)",
              "Pega la URL pública de un MP4 (Supabase Storage, CDN, etc.). Si lo dejas vacío, se usa NEXT_PUBLIC_HERO_VIDEO_URL o el archivo en public/videos/."
            )}
            <input
              type="url"
              inputMode="url"
              autoComplete="off"
              placeholder="https://…"
              className={inputCls}
              value={content[HERO_VIDEO_CLAVE] ?? ""}
              onChange={(e) => handleChange(HERO_VIDEO_CLAVE, e.target.value)}
            />
          </div>
        </div>

        {/* Textos principales */}
        <div className="rounded-2xl border border-[#E8C9C1] bg-white p-6 space-y-5">
          <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-light" style={{ color: "var(--deep-mauve)" }}>
            Textos principales
          </h2>

          <div className="flex flex-col gap-1.5">
            {labelEl("Eyebrow", "Texto pequeño dorado sobre el título")}
            <input type="text" className={inputCls}
              value={content.hero_eyebrow ?? ""}
              onChange={(e) => handleChange("hero_eyebrow", e.target.value)} />
          </div>

          <div className="flex flex-col gap-1.5">
            {labelEl("Título principal (H1)")}
            <input type="text" className={inputCls}
              value={content.hero_titulo ?? ""}
              onChange={(e) => handleChange("hero_titulo", e.target.value)} />
          </div>

          <div className="flex flex-col gap-1.5">
            {labelEl("Descripción")}
            <textarea rows={3} className={`${inputCls} resize-none`}
              value={content.hero_descripcion ?? ""}
              onChange={(e) => handleChange("hero_descripcion", e.target.value)} />
          </div>
        </div>

        {/* Estadísticas */}
        <div className="rounded-2xl border border-[#E8C9C1] bg-white p-6 space-y-5">
          <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-light" style={{ color: "var(--deep-mauve)" }}>
            Estadísticas
          </h2>

          {[
            { valKey: "hero_stat1_valor", lblKey: "hero_stat1_label", n: "1" },
            { valKey: "hero_stat2_valor", lblKey: "hero_stat2_label", n: "2" },
            { valKey: "hero_stat3_valor", lblKey: "hero_stat3_label", n: "3" },
          ].map(({ valKey, lblKey, n }) => (
            <div key={n} className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                {labelEl(`Stat ${n} — número`)}
                <input type="text" className={inputCls}
                  value={content[valKey] ?? ""}
                  onChange={(e) => handleChange(valKey, e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                {labelEl(`Stat ${n} — etiqueta`)}
                <input type="text" className={inputCls}
                  value={content[lblKey] ?? ""}
                  onChange={(e) => handleChange(lblKey, e.target.value)} />
              </div>
            </div>
          ))}
        </div>

        {/* Imagen y textos flotantes */}
        <div className="rounded-2xl border border-[#E8C9C1] bg-white p-6 space-y-5">
          <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-light" style={{ color: "var(--deep-mauve)" }}>
            Imagen y elementos flotantes
          </h2>

          {/* Image upload */}
          <div className="flex flex-col gap-2">
            {labelEl("Foto principal del hero", "Si no hay foto se muestra el gradiente de color")}

            {imagePreview && (
              <div className="overflow-hidden rounded-xl border border-[#E8C9C1]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="Vista previa hero" className="max-h-48 w-full object-cover" />
              </div>
            )}

            <div className="flex gap-3">
              <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#D4A5A0] px-4 py-3 transition-colors hover:border-[#8B5E6D]">
                <svg className="h-4 w-4 flex-shrink-0 text-[#8B5E6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span className="font-[family-name:var(--font-inter)] text-xs text-[#7A6A6E]">
                  {imageFile ? imageFile.name : "Seleccionar imagen"}
                </span>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="sr-only" />
              </label>

              {imagePreview && (
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setImageFile(null);
                    handleChange("hero_imagen_url", "");
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                  className="rounded-xl border border-[#E8C9C1] px-4 font-[family-name:var(--font-inter)] text-xs text-[#B5A8AC] transition-colors hover:border-red-200 hover:text-red-400"
                >
                  Quitar
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            {labelEl("Texto sobre la imagen", "Texto en cursiva que aparece sobre el gradiente/foto")}
            <input type="text" className={inputCls}
              value={content.hero_imagen_texto ?? ""}
              onChange={(e) => handleChange("hero_imagen_texto", e.target.value)} />
          </div>

          <div className="flex flex-col gap-1.5">
            {labelEl("Badge de disponibilidad", "Tarjeta flotante en la esquina inferior izquierda")}
            <input type="text" className={inputCls}
              value={content.hero_disponibilidad ?? ""}
              onChange={(e) => handleChange("hero_disponibilidad", e.target.value)} />
          </div>
        </div>

        {/* Save button bottom */}
        <div className="flex justify-end">
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
