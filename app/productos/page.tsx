"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import ProductCardDB from "../components/ProductCardDB";
import { supabase } from "@/lib/supabaseClient";
import { checkIsAdmin, checkIsAdminForUser } from "@/lib/checkAdmin";
import type { DbProduct } from "@/lib/types";
import { PencilBtn, InlineEditModal, get, type ContentMap, type Field } from "@/app/components/ui/InlineEdit";

// ─── Page header editable content ─────────────────────────────────────────────

const PH_DEFAULTS: ContentMap = {
  ph_eyebrow:     "Catálogo de Productos",
  ph_titulo:      "Dermocosmética",
  ph_titulo_em:   "Coreana",
  ph_descripcion: "Selección curada de dermocosmética coreana. Marcas con fórmulas avanzadas, ingredientes de alta pureza y resultados visibles. Sin parabenos, sin sulfatos.",
  ph_stat2_value: "K-Beauty",
  ph_stat2_label: "Origen",
  ph_stat3_value: "100%",
  ph_stat3_label: "Curado",
  ph_stat4_value: "Clín.",
  ph_stat4_label: "Testeado",
};

type PHEditing = "header" | "stats" | null;

const PH_MODALS: Record<NonNullable<PHEditing>, { title: string; fields: Field[] }> = {
  header: {
    title: "Hero — Productos",
    fields: [
      { key: "ph_eyebrow",     label: "Eyebrow" },
      { key: "ph_titulo",      label: "Título — línea 1" },
      { key: "ph_titulo_em",   label: "Título — línea 2 (cursiva)" },
      { key: "ph_descripcion", label: "Descripción", multiline: true },
    ],
  },
  stats: {
    title: "Stats del hero",
    fields: [
      { key: "ph_stat2_value", label: "Stat 2 — valor" },
      { key: "ph_stat2_label", label: "Stat 2 — etiqueta" },
      { key: "ph_stat3_value", label: "Stat 3 — valor" },
      { key: "ph_stat3_label", label: "Stat 3 — etiqueta" },
      { key: "ph_stat4_value", label: "Stat 4 — valor" },
      { key: "ph_stat4_label", label: "Stat 4 — etiqueta" },
    ],
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildUniqueFileName(original: string): string {
  const ext = original.split(".").pop() ?? "jpg";
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
}

// ─── Create Product Modal ─────────────────────────────────────────────────────

function CreateProductModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (p: DbProduct) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [badge, setBadge] = useState("");
  const [tipoPiel, setTipoPiel] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setImagen(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  function validate(): string | null {
    if (!nombre.trim()) return "El nombre es obligatorio.";
    if (!descripcion.trim()) return "La descripción es obligatoria.";
    if (!categoria.trim()) return "La categoría es obligatoria.";
    if (!precio || isNaN(Number(precio)) || Number(precio) <= 0)
      return "El precio debe ser mayor a 0.";
    if (!imagen) return "Selecciona una imagen para el producto.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);

    const UPLOAD_TIMEOUT_MS = 15_000;

    try {
      console.log("[CreateProductModal] 1) antes de buildUniqueFileName");
      const fileName = buildUniqueFileName(imagen!.name);
      console.log("[CreateProductModal] 2) fileName:", fileName);
      console.log("[CreateProductModal] 3) antes de upload");

      const uploadPromise = supabase.storage
        .from("productos")
        .upload(fileName, imagen!, { upsert: false });

      const timeoutPromise = new Promise<"timeout">((resolve) =>
        setTimeout(() => resolve("timeout"), UPLOAD_TIMEOUT_MS)
      );

      const raced = await Promise.race([uploadPromise, timeoutPromise]);

      if (raced === "timeout") {
        console.log("[CreateProductModal] 4) despues de upload", { uploadError: null, timedOut: true });
        setError("La subida de imagen tardó demasiado. Intenta nuevamente.");
        return;
      }

      const { error: uploadError } = raced;
      console.log("[CreateProductModal] 4) despues de upload", { uploadError });

      if (uploadError) { setError(`Error al subir imagen: ${uploadError.message}`); return; }

      const { data: urlData } = supabase.storage.from("productos").getPublicUrl(fileName);
      const imagen_url = urlData.publicUrl;

      console.log("[CreateProductModal] 5) antes de insert", { imagen_url });
      const { data, error: insertError } = await supabase
        .from("productos")
        .insert({
          nombre: nombre.trim(),
          "descripción": descripcion.trim(),
          precio: Number(precio),
          categoria: categoria.trim(),
          stock: 0,
          imagen_url,
          activo: true,
          badge: badge.trim(),
          tipo_piel: tipoPiel,
        })
        .select()
        .single();

      console.log("[CreateProductModal] 6) despues de insert", { data, insertError });

      if (insertError) { setError(`Error al guardar: ${insertError.message}`); return; }

      setNombre("");
      setDescripcion("");
      setPrecio("");
      setCategoria("");
      setBadge("");
      setTipoPiel("");
      setImagen(null);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";

      onCreated(data as DbProduct);
    } catch (err) {
      console.error("[CreateModal]", err);
      setError("Ocurrió un error inesperado.");
    } finally {
      console.log("[CreateProductModal] 7) finally setLoading false");
      setLoading(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-[#E8C9C1] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#2C2329] outline-none transition focus:border-[#8B5E6D]";

  const labelEl = (text: string) => (
    <span className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-widest text-[#7A6A6E] uppercase">
      {text}
    </span>
  );

  return (
    <>
      <div
        className="fixed inset-0 z-[200] bg-[#2C2329]/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-modal-title"
        className="fixed left-1/2 top-1/2 z-[201] flex w-full max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl bg-[#FAF8F5] shadow-2xl"
        style={{ maxHeight: "90dvh" }}
      >
        {/* Header — fijo */}
        <div className="flex flex-shrink-0 items-start justify-between border-b border-[#E8C9C1]/60 px-8 py-6">
          <div>
            <p className="mb-0.5 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[0.3em] text-[#C9A96E] uppercase">
              Nuevo producto
            </p>
            <h2
              id="create-modal-title"
              className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#2C2329]"
            >
              Agregar al catálogo
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

        {/* Body — scrolleable (flex-1 + min-h-0 para que overflow funcione dentro de max-h del modal) */}
        <form
          id="create-product-form"
          onSubmit={handleSubmit}
          noValidate
          className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-8 py-6"
        >

          {/* Nombre */}
          <div className="flex flex-col gap-1.5">
            {labelEl("Nombre")}
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Sérum Vitamina C" className={inputCls} required />
          </div>

          {/* Descripción */}
          <div className="flex flex-col gap-1.5">
            {labelEl("Descripción")}
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción del producto..." rows={2}
              className={`${inputCls} resize-none`} required />
          </div>

          {/* Precio */}
          <div className="flex flex-col gap-1.5">
            {labelEl("Precio")}
            <input type="number" min="0" step="0.01" value={precio}
              onChange={(e) => setPrecio(e.target.value)} placeholder="Ej: 12500"
              className={inputCls} required />
          </div>

          {/* Categoría + Tipo de piel */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-1.5">
              {labelEl("Categoría")}
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)}
                className={`${inputCls} cursor-pointer`} required>
                <option value="">Selecciona</option>
                <option value="facial">Facial</option>
                <option value="solar">Solar</option>
                <option value="hidratacion">Hidratación</option>
                <option value="tratamiento">Tratamiento</option>
                <option value="kit">Kit</option>
                <option value="maquillaje">Maquillaje</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="flex min-w-0 flex-col gap-1.5">
              {labelEl("Tipo de piel")}
              <select value={tipoPiel} onChange={(e) => setTipoPiel(e.target.value)}
                className={`${inputCls} cursor-pointer`}>
                <option value="">Sin especificar</option>
                <option value="Todo tipo">Todo tipo</option>
                <option value="Grasa">Grasa</option>
                <option value="Mixta">Mixta</option>
                <option value="Normal">Normal</option>
                <option value="Seca">Seca</option>
                <option value="Sensible">Sensible</option>
              </select>
            </div>
          </div>

          {/* Badge */}
          <div className="flex flex-col gap-1.5">
            {labelEl("Badge destacado")}
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="Ej: Recomendado, Más vendido… (opcional)"
              className={inputCls}
            />
          </div>

          {/* Imagen */}
          <div className="flex flex-col gap-2">
            {labelEl("Imagen del producto")}
            {preview && (
              <div className="overflow-hidden rounded-xl border border-[#E8C9C1]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Vista previa" className="max-h-28 w-full object-cover" />
              </div>
            )}
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#D4A5A0] px-4 py-2.5 transition-colors hover:border-[#8B5E6D] hover:text-[#5C3A48]">
              <svg className="h-4 w-4 flex-shrink-0 text-[#8B5E6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <span className="font-[family-name:var(--font-inter)] text-xs text-[#7A6A6E]">
                {imagen ? imagen.name : "Seleccionar imagen"}
              </span>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="sr-only" required />
            </label>
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-2.5 font-[family-name:var(--font-inter)] text-xs text-red-700">
              {error}
            </p>
          )}
        </form>

        {/* Footer — fijo */}
        <div className="flex flex-shrink-0 gap-3 border-t border-[#E8C9C1]/60 px-8 py-5">
          <button type="button" onClick={onClose}
            className="flex-1 rounded-full border border-[#E8C9C1] py-2.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest text-[#7A6A6E] uppercase transition-colors hover:border-[#D4A5A0] hover:text-[#5C3A48]">
            Cancelar
          </button>
          <button type="submit" form="create-product-form" disabled={loading || !imagen}
            className="flex-1 rounded-full py-2.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest uppercase transition-opacity"
            style={{ backgroundColor: "var(--deep-mauve)", color: "#fff", opacity: loading || !imagen ? 0.6 : 1, cursor: loading || !imagen ? "not-allowed" : "pointer" }}>
            {loading ? "Guardando..." : "Crear producto"}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────

interface EditModalProps {
  product: DbProduct;
  onClose: () => void;
  onSave: (updated: DbProduct) => void;
  onDelete: (id: string) => void;
}

function EditProductModal({ product, onClose, onSave, onDelete }: EditModalProps) {
  const [nombre, setNombre] = useState(product.nombre);
  const [descripcion, setDescripcion] = useState(product.descripción);
  const [precio, setPrecio] = useState(String(product.precio));
  const [badge, setBadge] = useState(product.badge ?? "");
  const [tipoPiel, setTipoPiel] = useState(product.tipo_piel ?? "");
  const [imagen, setImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(product.imagen_url);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setImagen(file);
    if (file) setPreview(URL.createObjectURL(file));
  }

  function validate(): string | null {
    if (!nombre.trim()) return "El nombre es obligatorio.";
    if (!descripcion.trim()) return "La descripción es obligatoria.";
    if (!precio || isNaN(Number(precio)) || Number(precio) <= 0)
      return "El precio debe ser un número mayor a 0.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Verificar que el usuario sea admin antes de cualquier operación
    const adminOk = await checkIsAdmin();
    if (!adminOk) {
      setError("No tienes permisos para editar este producto.");
      return;
    }

    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setLoading(true);

    try {
      let imagen_url = product.imagen_url;

      // Upload new image if selected
      if (imagen) {
        const fileName = buildUniqueFileName(imagen.name);
        const { error: uploadError } = await supabase.storage
          .from("productos")
          .upload(fileName, imagen, { upsert: false });

        if (uploadError) {
          setError(`Error al subir la imagen: ${uploadError.message}`);
          setLoading(false);
          return;
        }

        const { data: urlData } = supabase.storage
          .from("productos")
          .getPublicUrl(fileName);

        imagen_url = urlData.publicUrl;
      }

      // Update row in Supabase
      const { data, error: updateError } = await supabase
        .from("productos")
        .update({
          nombre: nombre.trim(),
          "descripción": descripcion.trim(),
          precio: Number(precio),
          imagen_url,
          badge: badge.trim(),
          tipo_piel: tipoPiel,
        })
        .eq("id", product.id)
        .select()
        .single();

      if (updateError) {
        setError(`Error al guardar: ${updateError.message}`);
        setLoading(false);
        return;
      }

      onSave(data as DbProduct);
    } catch (err) {
      console.error("[EditModal] Error inesperado:", err);
      setError("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setError(null);
    const adminOk = await checkIsAdmin();
    if (!adminOk) {
      setError("No tienes permisos para eliminar este producto.");
      return;
    }
    if (!window.confirm(`¿Eliminar permanentemente «${product.nombre}»? Esta acción no se puede deshacer.`)) return;

    setDeleting(true);
    try {
      const { error: delError } = await supabase.from("productos").delete().eq("id", product.id);
      if (delError) {
        setError(`Error al eliminar: ${delError.message}`);
        return;
      }
      onDelete(String(product.id));
    } catch (err) {
      console.error("[EditModal] Delete error:", err);
      setError("Ocurrió un error al eliminar.");
    } finally {
      setDeleting(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-[#E8C9C1] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#2C2329] outline-none transition focus:border-[#8B5E6D]";

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
        aria-labelledby="edit-modal-title"
        className="fixed left-1/2 top-1/2 z-[201] flex w-full max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl bg-[#FAF8F5] shadow-2xl"
        style={{ maxHeight: "90dvh" }}
      >
        {/* Header — fijo */}
        <div className="flex flex-shrink-0 items-start justify-between border-b border-[#E8C9C1]/60 px-8 py-6">
          <div>
            <p className="mb-0.5 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[0.3em] text-[#C9A96E] uppercase">
              Editar producto
            </p>
            <h2
              id="edit-modal-title"
              className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#2C2329]"
            >
              {product.nombre}
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

        {/* Body — scrolleable */}
        <form
          id="edit-product-form"
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-8 py-6"
        >

          {/* Nombre */}
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-widest text-[#7A6A6E] uppercase">
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={inputCls}
              required
            />
          </div>

          {/* Descripción */}
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-widest text-[#7A6A6E] uppercase">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={2}
              className={`${inputCls} resize-none`}
              required
            />
          </div>

          {/* Precio + Tipo de piel */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-1.5">
              <label className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-widest text-[#7A6A6E] uppercase">
                Precio
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className={inputCls}
                required
              />
            </div>
            <div className="flex min-w-0 flex-col gap-1.5">
              <label className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-widest text-[#7A6A6E] uppercase">
                Tipo de piel
              </label>
              <select value={tipoPiel} onChange={(e) => setTipoPiel(e.target.value)}
                className={`${inputCls} cursor-pointer`}>
                <option value="">Sin especificar</option>
                <option value="Todo tipo">Todo tipo</option>
                <option value="Grasa">Grasa</option>
                <option value="Mixta">Mixta</option>
                <option value="Normal">Normal</option>
                <option value="Seca">Seca</option>
                <option value="Sensible">Sensible</option>
              </select>
            </div>
          </div>

          {/* Badge */}
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-widest text-[#7A6A6E] uppercase">
              Badge destacado
            </label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="Ej: Recomendado, Más vendido… (vacío = sin badge)"
              className={inputCls}
            />
          </div>

          {/* Imagen */}
          <div className="flex flex-col gap-2">
            <label className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-widest text-[#7A6A6E] uppercase">
              Imagen
            </label>

            {preview && (
              <div className="overflow-hidden rounded-xl border border-[#E8C9C1]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Vista previa"
                  className="max-h-28 w-full object-cover"
                />
              </div>
            )}

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#D4A5A0] px-4 py-2.5 text-sm text-[#7A6A6E] transition-colors hover:border-[#8B5E6D] hover:text-[#5C3A48]">
              <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <span className="font-[family-name:var(--font-inter)] text-xs">
                {imagen ? imagen.name : "Subir nueva imagen (opcional)"}
              </span>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="sr-only"
              />
            </label>
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-2.5 font-[family-name:var(--font-inter)] text-xs text-red-700">
              {error}
            </p>
          )}
        </form>

        {/* Footer — fijo */}
        <div className="flex flex-shrink-0 flex-col gap-3 border-t border-[#E8C9C1]/60 px-8 py-5">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading || deleting}
              className="flex-1 rounded-full border border-[#E8C9C1] py-2.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest text-[#7A6A6E] uppercase transition-colors hover:border-[#D4A5A0] hover:text-[#5C3A48] disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="edit-product-form"
              disabled={loading || deleting}
              className="flex-1 rounded-full py-2.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest uppercase transition-opacity"
              style={{
                backgroundColor: "var(--deep-mauve)",
                color: "#fff",
                opacity: loading || deleting ? 0.6 : 1,
                cursor: loading || deleting ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading || deleting}
            className="w-full rounded-full border border-red-200 py-2.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest text-red-600 uppercase transition-colors hover:bg-red-50 disabled:opacity-50"
          >
            {deleting ? "Eliminando..." : "Eliminar producto"}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Products Page ────────────────────────────────────────────────────────────

const PAGE_SIZE = 25;

export default function ProductsPage() {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [editingProduct, setEditingProduct] = useState<DbProduct | null>(null);
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [activeSkinType, setActiveSkinType] = useState("Todos");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [phContent, setPhContent] = useState<ContentMap>(PH_DEFAULTS);
  const [phEditing, setPhEditing] = useState<PHEditing>(null);

  const pg = (key: string) => get(phContent, key, PH_DEFAULTS);

  async function savePhFields(updates: ContentMap) {
    await Promise.all(
      Object.entries(updates).map(([clave, valor]) =>
        supabase.from("contenido_sitio").update({ valor }).eq("clave", clave)
      )
    );
    setPhContent((prev) => ({ ...prev, ...updates }));
  }

  useEffect(() => {
    let mounted = true;

    /** Productos + hero header. `silent`: sin tocar el spinner (solo login/logout). */
    /** Si viene `authUserId`, no usar getSession (llamada desde onAuthStateChange). */
    async function loadCatalog(
      opts?: { silent?: boolean } | { silent?: boolean; authUserId: string | null }
    ) {
      const silent = opts?.silent ?? false;
      console.log("[Productos] loadCatalog:start", {
        silent: opts?.silent ?? false,
        authUserId: opts && "authUserId" in opts ? opts.authUserId : "session",
      });
      try {
        console.log("[Productos] query:productos:start");
        const { data: productos, error } = await supabase.from("productos").select("*");
        console.log("[Productos] query:productos:end", {
          error: error?.message ?? null,
          count: productos?.length ?? 0,
        });

        console.log("[Productos] query:header:start");
        const { data: headerData } = await supabase
          .from("contenido_sitio")
          .select("clave, valor")
          .eq("seccion", "productos_header");
        console.log("[Productos] query:header:end", { count: headerData?.length ?? 0 });

        if (mounted) {
          if (error) {
            console.error("[Productos] Error al cargar:", error.message);
          } else {
            console.log("[Productos] setProducts");
            setProducts(productos ?? []);
          }

          if (headerData) {
            const map: ContentMap = {};
            for (const item of headerData) map[item.clave] = item.valor;
            console.log("[Productos] setPhContent");
            setPhContent(map);
          }
        }
      } catch (e) {
        console.error("[Productos] Error inesperado:", e);
      } finally {
        console.log("[Productos] loadCatalog:finally", { silent });
        if (mounted && !silent) setLoadingProducts(false);
      }

      if (!mounted) return;
      const adminStatus =
        opts && "authUserId" in opts
          ? await checkIsAdminForUser(opts.authUserId)
          : await checkIsAdmin();
      if (mounted) setIsAdmin(adminStatus);
    }

    void loadCatalog();

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        await loadCatalog({ silent: true, authUserId: session?.user?.id ?? null });
        return;
      }

      if (!session) {
        setIsAdmin(false);
        return;
      }
      const { data } = await supabase
        .from("admins")
        .select("user_id")
        .eq("user_id", session.user.id)
        .maybeSingle();
      if (mounted) setIsAdmin(!!data);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  function handleUpdate(updated: DbProduct) {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  }

  function handleCreated(newProduct: DbProduct) {
    setProducts((prev) => [newProduct, ...prev]);
    setCreatingProduct(false);
  }

  function handleDeletedProduct(id: string) {
    setProducts((prev) => prev.filter((p) => String(p.id) !== id));
    setEditingProduct(null);
  }

  async function handleToggle(product: DbProduct) {
    const { data, error } = await supabase
      .from("productos")
      .update({ activo: !product.activo })
      .eq("id", product.id)
      .select()
      .single();

    if (!error && data) {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? (data as DbProduct) : p)));
    }
  }

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.categoria))].filter(Boolean).sort();
    return ["Todos", ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => isAdmin || p.activo);
    if (activeCategory !== "Todos") list = list.filter((p) => p.categoria === activeCategory);
    if (activeSkinType !== "Todos") list = list.filter((p) => p.tipo_piel === activeSkinType);
    if (sortBy === "price-asc") list = [...list].sort((a, b) => a.precio - b.precio);
    if (sortBy === "price-desc") list = [...list].sort((a, b) => b.precio - a.precio);
    return list;
  }, [products, activeCategory, activeSkinType, sortBy, isAdmin]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  function changeCategory(cat: string) {
    setActiveCategory(cat);
    setCurrentPage(1);
  }

  function changeSkinType(type: string) {
    setActiveSkinType(type);
    setCurrentPage(1);
  }

  function changeSort(val: typeof sortBy) {
    setSortBy(val);
    setCurrentPage(1);
  }

  function scrollToGrid() {
    document.getElementById("productos-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goToPage(page: number) {
    setCurrentPage(page);
    scrollToGrid();
  }

  const countByCategory = (cat: string) =>
    cat === "Todos" ? products.filter((p) => isAdmin || p.activo).length : products.filter((p) => (isAdmin || p.activo) && p.categoria === cat).length;

  return (
    <>
      <main className="min-h-screen bg-[#FAF8F5]">

        {/* Page Hero */}
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
                Productos
              </span>
            </nav>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase">
                      {pg("ph_eyebrow")}
                    </span>
                    {isAdmin && <PencilBtn onClick={() => setPhEditing("header")} />}
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm">
                    <span className="text-sm">🇰🇷</span>
                    <span className="font-[family-name:var(--font-inter)] text-[10px] font-light tracking-wider text-white/70">
                      K-Beauty
                    </span>
                  </span>
                </div>
                <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[1.1] text-[#FAF8F5] lg:text-6xl">
                  {pg("ph_titulo")}
                  <br />
                  <em className="text-[#E8C9C1]">{pg("ph_titulo_em")}</em>
                </h1>
              </div>
              <p className="max-w-sm font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#E8C9C1]/70">
                {pg("ph_descripcion")}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
              <div className="flex items-baseline gap-1.5">
                <span className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#C9A96E]">
                  {String(products.length || "—")}
                </span>
                <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60">
                  Productos
                </span>
              </div>
              {[
                { value: pg("ph_stat2_value"), label: pg("ph_stat2_label") },
                { value: pg("ph_stat3_value"), label: pg("ph_stat3_label") },
                { value: pg("ph_stat4_value"), label: pg("ph_stat4_label") },
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
              {isAdmin && <PencilBtn onClick={() => setPhEditing("stats")} />}
            </div>
          </div>
        </div>

        {/* Filters + Grid */}
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">

          {/* Admin banner */}
          {isAdmin && (
            <div className="mb-6 flex items-center justify-between rounded-2xl border border-[#C9A96E]/40 bg-[#C9A96E]/10 px-5 py-3">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#C9A96E]" />
                <p className="font-[family-name:var(--font-inter)] text-xs text-[#5C3A48]">
                  Modo administrador activo — haz clic en el{" "}
                  <span className="font-medium">ícono de lápiz</span> para editar un producto
                </p>
              </div>
              <Link
                href="/admin"
                className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-widest text-[#C9A96E] uppercase transition-colors hover:text-[#5C3A48]"
              >
                Ir al panel →
              </Link>
            </div>
          )}

          {/* Filters bar */}
          <div id="productos-grid" className="mb-10 flex flex-col gap-5 scroll-mt-8">

            {/* Row 1: Category + sort/count */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => changeCategory(cat)}
                    className={`flex items-center gap-1.5 rounded-full border px-4 py-2 font-[family-name:var(--font-inter)] text-xs font-medium tracking-wider uppercase transition-all duration-200 ${
                      activeCategory === cat
                        ? "border-[#5C3A48] bg-[#5C3A48] text-[#FAF8F5]"
                        : "border-[#E8C9C1] bg-white text-[#7A6A6E] hover:border-[#D4A5A0] hover:text-[#5C3A48]"
                    }`}
                  >
                    {cat}
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${activeCategory === cat ? "bg-white/20 text-white" : "bg-[#F2E4DF] text-[#8B5E6D]"}`}>
                      {countByCategory(cat)}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <span className="font-[family-name:var(--font-inter)] text-xs font-light text-[#B5A8AC]">
                  {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
                  {totalPages > 1 && ` · pág. ${currentPage}/${totalPages}`}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => changeSort(e.target.value as typeof sortBy)}
                  className="rounded-full border border-[#E8C9C1] bg-white px-4 py-2 font-[family-name:var(--font-inter)] text-xs font-light text-[#7A6A6E] outline-none transition-colors hover:border-[#D4A5A0] focus:border-[#8B5E6D]"
                >
                  <option value="default">Ordenar por</option>
                  <option value="price-asc">Menor precio</option>
                  <option value="price-desc">Mayor precio</option>
                </select>
              </div>
            </div>

            {/* Row 2: Skin type filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[0.2em] text-[#B5A8AC] uppercase mr-1">
                Tipo de piel
              </span>
              {["Todos", "Todo tipo", "Grasa", "Mixta", "Normal", "Seca", "Sensible"].map((type) => (
                <button
                  key={type}
                  onClick={() => changeSkinType(type)}
                  className={`rounded-full border px-3.5 py-1.5 font-[family-name:var(--font-inter)] text-xs transition-all duration-200 ${
                    activeSkinType === type
                      ? "border-[#C9A96E] bg-[#C9A96E] text-white"
                      : "border-[#E8C9C1] bg-white text-[#7A6A6E] hover:border-[#C9A96E] hover:text-[#5C3A48]"
                  }`}
                >
                  {type === "Todos" ? "Todos" : type}
                </button>
              ))}
            </div>
          </div>

          {/* Product grid */}
          {loadingProducts ? (
            <div className="flex items-center justify-center py-24">
              <p className="font-[family-name:var(--font-inter)] text-sm font-light tracking-widest text-[#B5A8AC] uppercase">
                Cargando productos...
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
              <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#2C2329]">
                Sin resultados
              </p>
              <p className="font-[family-name:var(--font-inter)] text-sm font-light text-[#7A6A6E]">
                No hay productos en esta categoría.
              </p>
              <button
                onClick={() => setActiveCategory("Todos")}
                className="rounded-full border border-[#8B5E6D]/40 px-6 py-2.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest text-[#8B5E6D] uppercase transition-all hover:bg-[#8B5E6D] hover:text-white"
              >
                Ver todos
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginated.map((product) => (
                <ProductCardDB
                  key={product.id}
                  product={product}
                  isAdmin={isAdmin}
                  onEdit={() => setEditingProduct(product)}
                  onToggle={() => handleToggle(product)}
                />
              ))}
              {isAdmin && currentPage === totalPages && (
                <button
                  onClick={() => setCreatingProduct(true)}
                  className="group flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#E8C9C1] bg-white/50 transition-all duration-300 hover:border-[#C9A96E] hover:bg-white"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E8C9C1] text-[#C9A96E] transition-all group-hover:border-[#C9A96E] group-hover:bg-[#C9A96E]/10">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </div>
                  <span className="font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest text-[#B5A8AC] uppercase transition-colors group-hover:text-[#C9A96E]">
                    Agregar producto
                  </span>
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && !loadingProducts && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {/* Prev */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8C9C1] text-[#7A6A6E] transition-all hover:border-[#5C3A48] hover:text-[#5C3A48] disabled:pointer-events-none disabled:opacity-30"
                aria-label="Página anterior"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const isFirst = page === 1;
                const isLast = page === totalPages;
                const nearCurrent = Math.abs(page - currentPage) <= 1;
                if (!isFirst && !isLast && !nearCurrent) {
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="flex h-9 w-5 items-center justify-center font-[family-name:var(--font-inter)] text-xs text-[#B5A8AC]">
                        …
                      </span>
                    );
                  }
                  return null;
                }
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`flex h-9 min-w-[36px] items-center justify-center rounded-full border px-3 font-[family-name:var(--font-inter)] text-xs font-medium transition-all ${
                      page === currentPage
                        ? "border-[#5C3A48] bg-[#5C3A48] text-white"
                        : "border-[#E8C9C1] text-[#7A6A6E] hover:border-[#5C3A48] hover:text-[#5C3A48]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8C9C1] text-[#7A6A6E] transition-all hover:border-[#5C3A48] hover:text-[#5C3A48] disabled:pointer-events-none disabled:opacity-30"
                aria-label="Página siguiente"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          )}

          <div className="mt-16 border-t border-[#E8C9C1]/60 pt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm font-light tracking-wider text-[#7A6A6E] transition-colors hover:text-[#5C3A48]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={(updated) => {
            handleUpdate(updated);
            setEditingProduct(null);
          }}
          onDelete={handleDeletedProduct}
        />
      )}

      {creatingProduct && (
        <CreateProductModal
          onClose={() => setCreatingProduct(false)}
          onCreated={handleCreated}
        />
      )}

      {phEditing && (
        <InlineEditModal
          {...PH_MODALS[phEditing]}
          content={phContent}
          defaults={PH_DEFAULTS}
          onClose={() => setPhEditing(null)}
          onSave={savePhFields}
        />
      )}
    </>
  );
}
