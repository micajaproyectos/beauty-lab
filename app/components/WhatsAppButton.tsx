"use client";

import { useState } from "react";
import { useAgendar } from "../context/AgendarContext";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const { openAgendar } = useAgendar();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Burbuja de texto */}
      <div
        className="transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0) scale(1)" : "translateY(6px) scale(0.95)",
          pointerEvents: "none",
        }}
      >
        <span
          className="block text-sm font-medium px-4 py-2 rounded-2xl rounded-br-none shadow-lg select-none"
          style={{
            background: "var(--deep-mauve)",
            color: "var(--cream)",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            letterSpacing: "0.01em",
          }}
        >
          Hablemos
        </span>
      </div>

      {/* Botón flotante */}
      <button
        type="button"
        aria-label="Contactar por WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={openAgendar}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-transform duration-200 hover:scale-110 active:scale-95"
        style={{
          background: "linear-gradient(135deg, var(--mauve) 0%, var(--deep-mauve) 100%)",
          boxShadow: "0 4px 20px rgba(92,58,72,0.45)",
        }}
      >
        {/* Ícono de WhatsApp */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M16 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.37.627 4.59 1.718 6.514L2.667 29.333l6.993-1.688A13.266 13.266 0 0 0 16 29.333c7.364 0 13.333-5.969 13.333-13.333S23.364 2.667 16 2.667Z"
            fill="var(--gold-light)"
            fillOpacity="0.18"
          />
          <path
            d="M16 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.37.627 4.59 1.718 6.514L2.667 29.333l6.993-1.688A13.266 13.266 0 0 0 16 29.333c7.364 0 13.333-5.969 13.333-13.333S23.364 2.667 16 2.667Z"
            stroke="var(--gold)"
            strokeWidth="1"
          />
          <path
            d="M21.84 18.56c-.3-.15-1.773-.874-2.048-.973-.274-.1-.474-.15-.673.15-.2.298-.773.973-.947 1.172-.174.2-.348.224-.648.075-.3-.15-1.267-.467-2.413-1.488-.892-.795-1.494-1.776-1.669-2.076-.174-.3-.018-.462.131-.61.134-.134.3-.349.448-.523.15-.174.2-.3.3-.499.1-.2.05-.374-.025-.523-.075-.15-.673-1.622-.922-2.22-.243-.583-.49-.504-.673-.514l-.573-.01c-.2 0-.523.075-.797.374-.274.3-1.046 1.022-1.046 2.493s1.07 2.893 1.22 3.092c.149.2 2.107 3.215 5.105 4.508.713.308 1.27.491 1.703.629.716.228 1.368.196 1.883.119.574-.086 1.773-.724 2.023-1.424.25-.7.25-1.3.175-1.424-.074-.124-.274-.199-.573-.349Z"
            fill="var(--cream)"
          />
        </svg>
      </button>
    </div>
  );
}
