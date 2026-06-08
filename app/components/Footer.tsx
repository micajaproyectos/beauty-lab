"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAdmin } from "@/app/context/AdminContext";
import { PencilBtn, InlineEditModal, get, type ContentMap, type Field } from "@/app/components/ui/InlineEdit";

const DEFAULTS: ContentMap = {
  footer_tagline:  "Ciencia al servicio del cuidado de tu piel. Estética facial premium online.",
  footer_ubicacion:"Av. El Bosque Nte. 0226, dpto. 302, Las Condes, Santiago",
  footer_ig_url:   "https://www.instagram.com/beauty.lab.esteticafacial/",
  footer_wa_url:   "https://wa.me/56933987534",
};

const MODALS: Record<"brand", { title: string; fields: Field[] }> = {
  brand: {
    title: "Datos de la marca en el footer",
    fields: [
      { key: "footer_tagline",   label: "Tagline",   multiline: true },
      { key: "footer_ubicacion", label: "Ubicación" },
      { key: "footer_ig_url",    label: "URL Instagram", hint: "https://www.instagram.com/..." },
      { key: "footer_wa_url",    label: "URL WhatsApp",  hint: "https://wa.me/56..." },
    ],
  },
};

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Tratamientos: [
    { label: "Rejuvenecimiento Facial", href: "/rejuvenecimiento-facial" },
    { label: "Lifting Facial",          href: "/lifting-facial" },
    { label: "Toxina Botulínica",       href: "/toxina-botulinica" },
    { label: "Ácido Hialurónico",       href: "/acido-hialuronico" },
    { label: "Bioestimulación",         href: "/bioestimulacion" },
    { label: "Hilos Tensores",          href: "/lifting-facial" },
    { label: "Hilos Revitalizantes",    href: "/hilos-revitalizantes" },
    { label: "Limpieza Facial",          href: "/limpieza-facial" },
    { label: "SkinCoach",               href: "/skincoach" },
  ],
  "K-Beauty": [
    { label: "Dermocosmética Coreana", href: "/dermocosmetica-coreana" },
    { label: "Protección Solar",       href: "/proteccion-solar" },
    { label: "Hidratantes",            href: "/hidratantes" },
  ],
  Nosotras: [
    { label: "Quiénes somos",   href: "/#nosotras" },
    { label: "Certificaciones", href: "/#nosotras" },
    { label: "Contacto",        href: "/#footer" },
  ],
};

const igIcon = (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const waIcon = (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();
  const [content, setContent] = useState<ContentMap>(DEFAULTS);
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState<"brand" | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data } = await supabase.from("contenido_sitio").select("clave, valor").eq("seccion", "footer");
      if (!mounted) return;
      if (data) {
        const map: ContentMap = {};
        for (const item of data) map[item.clave] = item.valor;
        setContent(map);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  async function saveFields(updates: ContentMap) {
    await Promise.all(
      Object.entries(updates).map(([clave, valor]) =>
        supabase.from("contenido_sitio").update({ valor }).eq("clave", clave)
      )
    );
    setContent((prev) => ({ ...prev, ...updates }));
  }

  const g = (key: string) => get(content, key, DEFAULTS);

  const socialLinks = [
    { name: "Instagram", href: g("footer_ig_url"), icon: igIcon },
    { name: "WhatsApp",  href: g("footer_wa_url"), icon: waIcon },
  ];

  return (
    <footer id="footer" className="bg-[#2C2329]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <span className="font-[family-name:var(--font-cormorant)] text-3xl font-light tracking-widest text-[#FAF8F5]">
                BEAUTY
              </span>
              <br />
              <span className="font-[family-name:var(--font-cormorant)] text-xs font-light tracking-[0.4em] text-[#C9A96E]">
                LAB
              </span>
            </div>
            <p className="mb-6 max-w-xs font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#B5A8AC]">
              {g("footer_tagline")}
            </p>

            <div className="mb-6 flex items-center gap-2">
              <svg className="h-3.5 w-3.5 flex-shrink-0 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="font-[family-name:var(--font-inter)] text-sm font-light text-[#B5A8AC]">
                {g("footer_ubicacion")}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#B5A8AC] transition-all hover:border-[#C9A96E]/50 hover:text-[#C9A96E]"
                >
                  {social.icon}
                </a>
              ))}
              {isAdmin && <PencilBtn onClick={() => setEditing("brand")} />}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.25em] text-[#C9A96E] uppercase">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-[family-name:var(--font-inter)] text-sm font-light text-[#B5A8AC] transition-colors hover:text-[#FAF8F5]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              {category === "K-Beauty" && (
                <p className="mt-4 max-w-[14rem] font-[family-name:var(--font-inter)] text-xs font-light leading-relaxed text-[#7A6A6E]">
                  Sobre $100.000 envío gratis.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-12">
          <p className="font-[family-name:var(--font-inter)] text-xs font-light text-[#7A6A6E]">
            © {year} Beauty Lab. Todos los derechos reservados.
          </p>
          <p className="font-[family-name:var(--font-inter)] text-xs font-light text-[#7A6A6E]">
            Creado por{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 600,
              }}
            >
              AM
            </span>
            {" "}
            <span style={{ color: "#e2e8f0" }}>Tecnología</span>
          </p>
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
    </footer>
  );
}
