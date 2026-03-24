"use client";

import { useEffect, useState } from "react";

export type ContentMap = Record<string, string>;

export function get(content: ContentMap, key: string, defaults: ContentMap): string {
  return content[key] ?? defaults[key] ?? "";
}

// ─── Pencil button ────────────────────────────────────────────────────────────

export function PencilBtn({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(e); }}
      title="Editar"
      className="ml-2 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[#E8C9C1] bg-white/90 text-[#8B5E6D] shadow-sm transition-all hover:bg-[#5C3A48] hover:text-white"
    >
      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
      </svg>
    </button>
  );
}

// ─── Inline edit modal ────────────────────────────────────────────────────────

export interface Field {
  key: string;
  label: string;
  multiline?: boolean;
  hint?: string;
}

interface InlineEditModalProps {
  title: string;
  fields: Field[];
  content: ContentMap;
  defaults: ContentMap;
  onClose: () => void;
  onSave: (updates: ContentMap) => Promise<void>;
}

export function InlineEditModal({ title, fields, content, defaults, onClose, onSave }: InlineEditModalProps) {
  const [values, setValues] = useState<ContentMap>(() => {
    const map: ContentMap = {};
    for (const f of fields) map[f.key] = get(content, f.key, defaults);
    return map;
  });
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
    onClose();
  }

  const inputCls = "w-full rounded-xl border border-[#E8C9C1] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#2C2329] outline-none transition focus:border-[#8B5E6D] font-[family-name:var(--font-inter)]";

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
            {title}
          </h2>
          <button onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E8C9C1] text-[#7A6A6E] hover:bg-[#F2E4DF]">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
          {fields.map((f) => (
            <div key={f.key} className="flex flex-col gap-1.5">
              <div className="flex flex-col gap-0.5">
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-widest text-[#7A6A6E] uppercase">
                  {f.label}
                </span>
                {f.hint && (
                  <span className="font-[family-name:var(--font-inter)] text-[10px] text-[#B5A8AC]">{f.hint}</span>
                )}
              </div>
              {f.multiline ? (
                <textarea
                  rows={3}
                  className={`${inputCls} resize-none`}
                  value={values[f.key] ?? ""}
                  onChange={(e) => setValues((prev) => ({ ...prev, [f.key]: e.target.value }))}
                />
              ) : (
                <input
                  type="text"
                  className={inputCls}
                  value={values[f.key] ?? ""}
                  onChange={(e) => setValues((prev) => ({ ...prev, [f.key]: e.target.value }))}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-3">
          <button onClick={onClose}
            className="flex-1 rounded-full border border-[#E8C9C1] py-2.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest text-[#7A6A6E] uppercase hover:border-[#D4A5A0]">
            Cancelar
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 rounded-full py-2.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest uppercase transition-opacity"
            style={{ backgroundColor: "var(--deep-mauve)", color: "#fff", opacity: saving ? 0.6 : 1 }}>
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </>
  );
}
