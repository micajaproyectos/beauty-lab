"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { checkIsAdmin } from "@/lib/checkAdmin";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildUniqueFileName(original: string): string {
  const ext = original.split(".").pop() ?? "jpg";
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
}

type StatusMsg = { type: "success" | "error"; text: string } | null;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NuevoProductoPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  // Auth guard — solo admins registrados en la tabla admins
  useEffect(() => {
    checkIsAdmin().then((isAdmin) => {
      if (!isAdmin) router.replace("/login");
    });
  }, [router]);

  // Form state
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusMsg>(null);

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
      return "El precio debe ser un número mayor a 0.";
    if (stock !== "" && (isNaN(Number(stock)) || Number(stock) < 0))
      return "El stock debe ser un número mayor o igual a 0.";
    if (!imagen) return "Selecciona una imagen para el producto.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    // Verificar que el usuario sea admin antes de cualquier operación
    const adminOk = await checkIsAdmin();
    if (!adminOk) {
      setStatus({ type: "error", text: "No tienes permisos para crear productos." });
      return;
    }

    const err = validate();
    if (err) { setStatus({ type: "error", text: err }); return; }

    setLoading(true);

    try {
      // 1. Subir imagen
      const fileName = buildUniqueFileName(imagen!.name);
      const { error: uploadError } = await supabase.storage
        .from("productos")
        .upload(fileName, imagen!, { upsert: false });

      if (uploadError) {
        setStatus({ type: "error", text: `Error al subir imagen: ${uploadError.message}` });
        return;
      }

      // 2. URL pública
      const { data: urlData } = supabase.storage.from("productos").getPublicUrl(fileName);
      const imagen_url = urlData.publicUrl;

      // 3. Insertar en tabla con nombres exactos de columnas
      const { error: insertError } = await supabase.from("productos").insert({
        nombre: nombre.trim(),
        "descripción": descripcion.trim(),
        precio: Number(precio),
        categoria: categoria.trim(),
        stock: stock !== "" ? Number(stock) : 0,
        imagen_url,
        activo: true,
      });

      if (insertError) {
        setStatus({ type: "error", text: `Error al guardar: ${insertError.message}` });
        return;
      }

      setStatus({ type: "success", text: `Producto "${nombre.trim()}" creado correctamente.` });

      // Reset form
      setNombre(""); setDescripcion(""); setPrecio("");
      setCategoria(""); setStock(""); setImagen(null); setPreview(null);
      if (fileRef.current) fileRef.current.value = "";

      // Redirigir a productos luego de 1.5s
      setTimeout(() => router.push("/productos"), 1500);

    } catch (err) {
      console.error("[NuevoProducto]", err);
      setStatus({ type: "error", text: "Ocurrió un error inesperado." });
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-[#E8C9C1] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#2C2329] outline-none transition focus:border-[#8B5E6D]";

  const label = (text: string) => (
    <span className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-widest text-[#7A6A6E] uppercase">
      {text}
    </span>
  );

  return (
    <main className="min-h-screen px-6 py-12" style={{ backgroundColor: "var(--cream)" }}>
      <div className="mx-auto max-w-xl">

        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/productos"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#E8C9C1] text-[#7A6A6E] transition-colors hover:bg-[#F2E4DF]"
            aria-label="Volver a productos"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
          </Link>
          <div>
            <p className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[0.3em] text-[#C9A96E] uppercase">
              Panel Admin
            </p>
            <h1
              className="font-[family-name:var(--font-cormorant)] text-3xl font-light"
              style={{ color: "var(--deep-mauve)" }}
            >
              Nuevo Producto
            </h1>
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-[#E8C9C1] bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            {/* Nombre */}
            <div className="flex flex-col gap-1.5">
              {label("Nombre")}
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Sérum Vitamina C"
                className={inputCls}
                required
              />
            </div>

            {/* Descripción */}
            <div className="flex flex-col gap-1.5">
              {label("Descripción")}
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción del producto..."
                rows={3}
                className={`${inputCls} resize-none`}
                required
              />
            </div>

            {/* Precio + Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                {label("Precio (ARS)")}
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="Ej: 12500"
                  className={inputCls}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                {label("Stock")}
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Ej: 20"
                  className={inputCls}
                />
              </div>
            </div>

            {/* Categoría */}
            <div className="flex flex-col gap-1.5">
              {label("Categoría")}
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className={`${inputCls} cursor-pointer`}
                required
              >
                <option value="">Selecciona una categoría</option>
                <option value="facial">Facial</option>
                <option value="solar">Solar</option>
                <option value="hidratacion">Hidratación</option>
                <option value="tratamiento">Tratamiento</option>
                <option value="kit">Kit</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {/* Imagen */}
            <div className="flex flex-col gap-2">
              {label("Imagen del producto")}

              {preview && (
                <div className="overflow-hidden rounded-xl border border-[#E8C9C1]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="max-h-44 w-full object-cover"
                  />
                </div>
              )}

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#D4A5A0] px-4 py-3 transition-colors hover:border-[#8B5E6D] hover:text-[#5C3A48]">
                <svg className="h-4 w-4 flex-shrink-0 text-[#8B5E6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span className="font-[family-name:var(--font-inter)] text-xs text-[#7A6A6E]">
                  {imagen ? imagen.name : "Seleccionar imagen"}
                </span>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="sr-only"
                  required
                />
              </label>
            </div>

            {/* Status */}
            {status && (
              <p
                className="rounded-xl px-4 py-3 font-[family-name:var(--font-inter)] text-xs"
                style={{
                  backgroundColor: status.type === "success" ? "#ecfdf5" : "#fde8e8",
                  color: status.type === "success" ? "#065f46" : "#9b1c1c",
                }}
              >
                {status.text}
              </p>
            )}

            {/* Actions */}
            <div className="mt-1 flex gap-3">
              <Link
                href="/productos"
                className="flex-1 rounded-full border border-[#E8C9C1] py-3 text-center font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest text-[#7A6A6E] uppercase transition-colors hover:border-[#D4A5A0] hover:text-[#5C3A48]"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-full py-3 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest uppercase transition-opacity"
                style={{
                  backgroundColor: "var(--deep-mauve)",
                  color: "#fff",
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Guardando..." : "Crear producto"}
              </button>
            </div>

          </form>
        </div>

        {/* Links secundarios */}
        <div className="mt-6 flex justify-center gap-6">
          <Link
            href="/admin"
            className="font-[family-name:var(--font-inter)] text-xs text-[#B5A8AC] transition-colors hover:text-[#7A6A6E]"
          >
            ← Ir al panel
          </Link>
        </div>

      </div>
    </main>
  );
}
