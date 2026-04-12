"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Google Ads detecta automáticamente la visita a esta URL como conversión.
// No se necesita ningún evento manual — el script en layout.tsx lo maneja.

export default function GraciasPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirige al inicio luego de 3 segundos
    const timer = setTimeout(() => router.replace("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#FAF8F5] px-6 text-center">
      <div className="flex flex-col items-center gap-6 max-w-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F2E4DF]">
          <svg
            className="h-9 w-9 text-[#8B5E6D]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <div>
          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#2C2329]">
            ¡Gracias!
          </h1>
          <p className="mt-2 font-[family-name:var(--font-inter)] text-sm font-light text-[#7A6A6E]">
            Tu mensaje fue enviado por WhatsApp.
            <br />
            Te respondemos a la brevedad.
          </p>
        </div>

        <p className="font-[family-name:var(--font-inter)] text-xs font-light text-[#B5A8AC]">
          Volviendo al inicio en unos segundos…
        </p>
      </div>
    </main>
  );
}
