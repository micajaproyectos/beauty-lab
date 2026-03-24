"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { checkIsAdmin } from "@/lib/checkAdmin";
import type { Tratamiento } from "@/lib/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CATEGORIAS = ["facial", "corporal", "laser", "skincoach", "otro"];

// ─── Form Modal ───────────────────────────────────────────────────────────────

interface ModalProps {
  tratamiento?: Tratamiento;
  onClose: () => void;
  onSaved: (t: Tratamiento) => void;
}

function TratamientoModal({ tratamiento, onClose, onSaved }: ModalProps) {
  const isEdit = !!tratamiento;
  const [nombre, setNombre] = useState(tratamiento?.nombre ?? "");
  const [descripcion, setDescripcion] = useState(tratamiento?.descripcion ?? "");
  const [categoria, setCategoria] = useState(tratamiento?.categoria ?? "facial");
  const [orden, setOrden] = useState(String(tratamiento?.orden ?? 0));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function validate(): string | null {
    if (!nombre.trim()) return "El nombre es obligatorio.";
    if (!descripcion.trim()) return "La descripción es obligatoria.";
    if (!categoria) return "La categoría es obligatoria.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);

    const payload = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      categoria,
      orden: Number(orden) || 0,
    };

    try {
      if (isEdit) {
        const { data, error: updateError } = await supabase
          .from("tratamientos")
          .update(payload)
          .eq("id", tratamiento!.id)
          .select()
          .single();

        if (updateError) { setError(updateError.message); return; }
        onSaved(data as Tratamiento);
      } else {
        const { data, error: insertError } = await supabase
          .from("tratamientos")
          .insert({ ...payload, activo: true })
          .select()
          .single();

        if (insertError) { setError(insertError.message); return; }
        onSaved(data as Tratamiento);
      }
    } catch (err) {
      console.error("[TratamientoModal]", err);
      setError("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-[#E8C9C1] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#2C2329] outline-none transition focus:border-[#8B5E6D] font-[family-name:var(--font-inter)]";

  const labelEl = (text: string) => (
    <span className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-widest text-[#7A6A6E] uppercase">
      {text}
    </span>
  );

  return (
    <>
      <div className="fixed inset-0 z-[200] bg-[#2C2329]/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="fixed left-1/2 top-1/2 z-[201] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[#FAF8F5] p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="mb-1 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[0.3em] text-[#C9A96E] uppercase">
              {isEdit ? "Editar" : "Nuevo"} tratamiento
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#2C2329]">
              {isEdit ? tratamiento!.nombre : "Agregar al catálogo"}
            </h2>
          </div>
          <button onClick={onClose}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#E8C9C1] text-[#7A6A6E] transition-colors hover:bg-[#F2E4DF]">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            {labelEl("Nombre")}
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Toxina Botulínica" className={inputCls} required />
          </div>

          <div className="flex flex-col gap-1.5">
            {labelEl("Descripción")}
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción del tratamiento..." rows={4}
              className={`${inputCls} resize-none`} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              {labelEl("Categoría")}
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)}
                className={`${inputCls} cursor-pointer`} required>
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              {labelEl("Orden")}
              <input type="number" min="0" step="1" value={orden}
                onChange={(e) => setOrden(e.target.value)}
                placeholder="0" className={inputCls} />
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-2.5 font-[family-name:var(--font-inter)] text-xs text-red-700">
              {error}
            </p>
          )}

          <div className="mt-2 flex gap-3">
            <button type="button" onClick={onClose}
              className="flex-1 rounded-full border border-[#E8C9C1] py-2.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest text-[#7A6A6E] uppercase transition-colors hover:border-[#D4A5A0] hover:text-[#5C3A48]">
              Cancelar
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 rounded-full py-2.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest uppercase transition-opacity"
              style={{ backgroundColor: "var(--deep-mauve)", color: "#fff", opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear tratamiento"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TratamientosAdminPage() {
  const router = useRouter();
  const [tratamientos, setTratamientos] = useState<Tratamiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Tratamiento | null>(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      const isAdmin = await checkIsAdmin();
      if (!isAdmin) { router.replace("/login"); return; }

      const { data, error } = await supabase
        .from("tratamientos")
        .select("*")
        .order("orden", { ascending: true })
        .order("created_at", { ascending: true });

      if (!mounted) return;
      if (error) console.error("[Tratamientos]", error.message);
      else setTratamientos(data ?? []);
      setLoading(false);
    }

    init();
    return () => { mounted = false; };
  }, [router]);

  async function toggleActivo(t: Tratamiento) {
    const { data, error } = await supabase
      .from("tratamientos")
      .update({ activo: !t.activo })
      .eq("id", t.id)
      .select()
      .single();

    if (!error && data) {
      setTratamientos((prev) => prev.map((x) => (x.id === t.id ? (data as Tratamiento) : x)));
    }
  }

  async function handleDelete(t: Tratamiento) {
    if (!confirm(`¿Eliminar "${t.nombre}"? Esta acción no se puede deshacer.`)) return;
    const { error } = await supabase.from("tratamientos").delete().eq("id", t.id);
    if (!error) setTratamientos((prev) => prev.filter((x) => x.id !== t.id));
  }

  function handleSaved(saved: Tratamiento) {
    setTratamientos((prev) => {
      const exists = prev.find((x) => x.id === saved.id);
      if (exists) return prev.map((x) => (x.id === saved.id ? saved : x));
      return [saved, ...prev];
    });
    setCreating(false);
    setEditing(null);
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
      <div className="mx-auto max-w-3xl space-y-8">

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
              Tratamientos
            </h1>
          </div>
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest uppercase transition-opacity hover:opacity-80"
            style={{ backgroundColor: "var(--deep-mauve)", color: "#fff" }}
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Agregar
          </button>
        </div>

        {/* List */}
        {tratamientos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E8C9C1] py-16 text-center" style={{ backgroundColor: "#fff" }}>
            <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#2C2329]">
              Sin tratamientos aún
            </p>
            <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-[#B5A8AC]">
              Presiona "Agregar" para crear el primero.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {tratamientos.map((t) => (
              <div
                key={t.id}
                className={`rounded-2xl border p-5 transition-all ${t.activo ? "bg-white border-[#E8C9C1]" : "bg-[#F9F5F3] border-[#E8C9C1]/40 opacity-60"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="rounded-full bg-[#F2E4DF] px-2.5 py-0.5 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-wider text-[#8B5E6D] uppercase">
                        {t.categoria}
                      </span>
                      {!t.activo && (
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 font-[family-name:var(--font-inter)] text-[10px] text-gray-400">
                          Inactivo
                        </span>
                      )}
                    </div>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#2C2329]">
                      {t.nombre}
                    </h3>
                    <p className="mt-1 font-[family-name:var(--font-inter)] text-sm text-[#7A6A6E] line-clamp-2">
                      {t.descripcion}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Toggle activo */}
                    <button
                      onClick={() => toggleActivo(t)}
                      title={t.activo ? "Desactivar" : "Activar"}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8C9C1] text-[#7A6A6E] transition-colors hover:bg-[#F2E4DF]"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {t.activo
                          ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        }
                      </svg>
                    </button>

                    {/* Editar */}
                    <button
                      onClick={() => setEditing(t)}
                      title="Editar"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8C9C1] text-[#7A6A6E] transition-colors hover:bg-[#F2E4DF]"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>

                    {/* Eliminar */}
                    <button
                      onClick={() => handleDelete(t)}
                      title="Eliminar"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8C9C1] text-[#D4A5A0] transition-colors hover:bg-red-50 hover:border-red-200 hover:text-red-400"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {creating && (
        <TratamientoModal onClose={() => setCreating(false)} onSaved={handleSaved} />
      )}
      {editing && (
        <TratamientoModal tratamiento={editing} onClose={() => setEditing(null)} onSaved={handleSaved} />
      )}
    </main>
  );
}
