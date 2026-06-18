"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// ─── Configuración ────────────────────────────────────────────────────────────

// Número de WhatsApp del negocio (destino del mensaje)
const BUSINESS_PHONE = "56933987534";

// Etiqueta de conversión de Google Ads.
// Acción "Agendar hora - WhatsApp" (evento manual, conteo "Una").
const CONVERSION_SEND_TO = "AW-18082765966/FtI2CNTJl8EcEI65xK5D";

// Tratamientos disponibles en el desplegable (lista fija).
const TRATAMIENTOS = [
  "Toxina Botulínica",
  "Ácido Hialurónico",
  "Bioestimulación",
  "Hilos Tensores",
  "Hilos Revitalizantes",
  "SkinCoach",
  "Lifting de Pestañas",
];

// ─── Componente ───────────────────────────────────────────────────────────────

export default function AgendarModal({ onClose }: { onClose: () => void }) {
  const [nombre, setNombre] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [fono, setFono] = useState("");

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const isValid = nombre.trim().length > 0 && tratamiento !== "" && fono.length === 8;

  const handleAgendar = () => {
    if (!isValid) return;

    // 1) Disparo de conversión (una sola vez, antes de abrir WhatsApp).
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "conversion", { send_to: CONVERSION_SEND_TO });
    }

    // 2) Abrir WhatsApp con el mensaje pre-rellenado.
    const mensaje = `Hola, soy ${nombre.trim()}. Quiero conocer las horas disponibles para ${tratamiento}. Mi contacto: +569 ${fono}. ¡Gracias!`;
    const url = `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    // 3) Cerrar el modal.
    onClose();
  };

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[200] bg-[#2C2329]/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="agendar-modal-title"
        className="fixed left-1/2 top-1/2 z-[201] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[#FAF8F5] p-8 shadow-2xl"
      >
        {/* Encabezado */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[0.25em] text-[#C9A96E] uppercase">
              Agenda tu hora
            </p>
            <h3
              id="agendar-modal-title"
              className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#2C2329]"
            >
              Cuéntanos para coordinar
            </h3>
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

        {/* Formulario */}
        <div className="space-y-4">
          {/* Nombre */}
          <div>
            <label
              htmlFor="agendar-nombre"
              className="mb-1.5 block font-[family-name:var(--font-inter)] text-xs font-medium tracking-wider text-[#5C3A48] uppercase"
            >
              Nombre
            </label>
            <input
              id="agendar-nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              autoComplete="name"
              className="w-full rounded-2xl border border-[#E8C9C1] bg-white px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-[#2C2329] outline-none transition-colors placeholder:text-[#B5A8AC] focus:border-[#5C3A48]"
            />
          </div>

          {/* Tratamiento */}
          <div>
            <label
              htmlFor="agendar-tratamiento"
              className="mb-1.5 block font-[family-name:var(--font-inter)] text-xs font-medium tracking-wider text-[#5C3A48] uppercase"
            >
              Tratamiento de interés
            </label>
            <select
              id="agendar-tratamiento"
              value={tratamiento}
              onChange={(e) => setTratamiento(e.target.value)}
              className={`w-full appearance-none rounded-2xl border border-[#E8C9C1] bg-white bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat px-4 py-3 pr-10 font-[family-name:var(--font-inter)] text-sm outline-none transition-colors focus:border-[#5C3A48] ${
                tratamiento === "" ? "text-[#B5A8AC]" : "text-[#2C2329]"
              }`}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%237A6A6E' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E\")",
              }}
            >
              <option value="" disabled>
                Selecciona un tratamiento
              </option>
              {TRATAMIENTOS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Fono de contacto */}
          <div>
            <label
              htmlFor="agendar-fono"
              className="mb-1.5 block font-[family-name:var(--font-inter)] text-xs font-medium tracking-wider text-[#5C3A48] uppercase"
            >
              Fono de contacto
            </label>
            <div className="flex items-stretch overflow-hidden rounded-2xl border border-[#E8C9C1] bg-white transition-colors focus-within:border-[#5C3A48]">
              <span className="flex select-none items-center border-r border-[#E8C9C1] bg-[#F2E4DF] px-4 font-[family-name:var(--font-inter)] text-sm font-medium text-[#5C3A48]">
                +569
              </span>
              <input
                id="agendar-fono"
                type="tel"
                inputMode="numeric"
                value={fono}
                onChange={(e) => setFono(e.target.value.replace(/\D/g, "").slice(0, 8))}
                placeholder="12345678"
                maxLength={8}
                autoComplete="tel-national"
                className="w-full bg-transparent px-4 py-3 font-[family-name:var(--font-inter)] text-sm tracking-wider text-[#2C2329] outline-none placeholder:text-[#B5A8AC]"
              />
            </div>
          </div>
        </div>

        {/* Botón Agendar */}
        <button
          onClick={handleAgendar}
          disabled={!isValid}
          className="mt-6 w-full rounded-full bg-[#5C3A48] py-3.5 font-[family-name:var(--font-inter)] text-sm font-medium tracking-widest text-[#FAF8F5] uppercase shadow transition-all hover:bg-[#2C2329] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Agendar
        </button>
        <p className="mt-3 text-center font-[family-name:var(--font-inter)] text-[10px] font-light text-[#B5A8AC]">
          Te llevamos a WhatsApp para coordinar tu hora disponible
        </p>
      </div>
    </>,
    document.body
  );
}
