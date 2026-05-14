import type { Metadata } from "next";
import Link from "next/link";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Protección Solar Coreana en Santiago — Beauty Lab",
  description:
    "Protectores solares coreanos SPF50+ de textura ligera, no comedogénica y acabado invisible. El paso más importante del skincare diario. Envío a todo Chile.",
};

const ventajas = [
  "Texturas ultraligeras que no dan sensación de grasa",
  "Fórmulas no comedogénicas para pieles acneicas",
  "Acabado invisible o luminoso según el tipo",
  "SPF50+ con PA++++ (máxima protección UVA)",
  "Compatibles con maquillaje encima",
  "Sin alcohol, sin fragancia en versiones para pieles sensibles",
];

const tipos = [
  { nombre: "Sunscreen en crema", descripcion: "Textura más hidratante, ideal para piel seca o mixta. Proporciona luminosidad y suavidad al tacto.", ideal: "Piel seca o mixta-seca" },
  { nombre: "Sunscreen en gel o agua", descripcion: "Textura acuosa, acabado mate o semi-mate. Perfecta para piel grasa o acneica sin sensación pesada.", ideal: "Piel grasa o acneica" },
  { nombre: "Cushion con SPF", descripcion: "Protección solar integrada en base ligera. Práctica para retoques durante el día y uso diario con cobertura.", ideal: "Uso con maquillaje" },
  { nombre: "Sunscreen con color", descripcion: "Tonifica y protege en un solo paso. Ideal como base o para días casuales sin querer aplicar maquillaje.", ideal: "Rutina simplificada" },
];

const faqs = [
  {
    pregunta: "¿Por qué es tan importante la protección solar en una rutina de skincare?",
    respuesta:
      "El sol es la principal causa externa del envejecimiento prematuro: manchas, pérdida de colágeno, arrugas y daño celular acumulativo. Ningún tratamiento estético ni activo cosmético tiene el mismo impacto preventivo que una buena protección solar diaria.",
  },
  {
    pregunta: "¿Qué diferencia hay entre el SPF coreano y el occidental?",
    respuesta:
      "Los protectores solares coreanos suelen tener texturas más ligeras, mejor acabado y fórmulas más innovadoras sin sacrificar la eficacia. Además, el estándar coreano incluye la protección PA++++ contra rayos UVA, que no siempre aparece en productos occidentales.",
  },
  {
    pregunta: "¿Tengo que usarlo aunque no salga mucho al sol?",
    respuesta:
      "Sí. La radiación UV atraviesa ventanas y existe incluso en días nublados. La exposición acumulada durante actividades cotidianas (ir al trabajo, estar cerca de una ventana) genera daño a largo plazo.",
  },
  {
    pregunta: "¿Puedo aplicar maquillaje encima del protector solar?",
    respuesta:
      "Sí. Los sunscreens coreanos están formulados para usarse como último paso de la rutina de cuidado antes del maquillaje. Muchos tienen acabados que sirven como base.",
  },
  {
    pregunta: "¿Cada cuánto hay que reaplicar?",
    respuesta:
      "Idealmente cada 2 horas en exposición directa. En interiores o con exposición indirecta, una aplicación matutina es suficiente para la mayoría de las actividades cotidianas.",
  },
];

export default function ProteccionSolarPage() {
  return (
    <>
      <main>
        {/* Hero */}
        <div className="relative overflow-hidden bg-[#5C3A48] pt-32 pb-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-[#8B5E6D]/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-[#2C2329]/40 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
            <nav className="mb-8 flex items-center gap-2" aria-label="Breadcrumb">
              <Link href="/" className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60 uppercase transition-colors hover:text-[#E8C9C1]">Inicio</Link>
              <span className="text-[#E8C9C1]/40">/</span>
              <Link href="/productos" className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60 uppercase transition-colors hover:text-[#E8C9C1]">K-Beauty</Link>
              <span className="text-[#E8C9C1]/40">/</span>
              <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#C9A96E] uppercase">Protección Solar</span>
            </nav>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-3">K-Beauty · SPF50+</span>
                <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[1.1] text-[#FAF8F5] lg:text-6xl">
                  Protección
                  <br />
                  <em className="text-[#E8C9C1]">solar</em>
                </h1>
              </div>
              <p className="max-w-sm font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#E8C9C1]/70">
                El paso más importante de cualquier rutina. Protectores solares coreanos SPF50+ con texturas ligeras que se usan con placer todos los días.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
              {[
                { value: "SPF50+", label: "Protección máxima" },
                { value: "PA++++", label: "Anti-UVA" },
                { value: "Ligero", label: "Acabado no graso" },
                { value: "Diario", label: "Uso mañana y noche" },
              ].map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#C9A96E]">{s.value}</span>
                  <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Por qué K-Beauty */}
        <section className="bg-[#FAF8F5] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
              <div>
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">¿Por qué coreano?</span>
                <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light leading-[1.15] text-[#2C2329] mb-6 lg:text-5xl">
                  El sol que no
                  <br />
                  <em className="text-[#5C3A48]">se nota</em>
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E] mb-4">
                  La industria cosmética coreana lleva décadas perfeccionando los protectores solares para que sean tan agradables de aplicar que ningún usuario quiera saltárselos. El resultado: fórmulas de última generación con la máxima eficacia y las texturas más ligeras del mercado.
                </p>
                <p className="font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E]">
                  En Beauty Lab seleccionamos protectores solares recomendados por criterio médico: eficaces, con ingredientes seguros y adecuados para distintos tipos de piel, incluidas las más sensibles.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {ventajas.map((v) => (
                  <div key={v} className="flex items-start gap-3 rounded-2xl border border-[#E8C9C1]/60 bg-white p-5">
                    <span className="mt-0.5 flex-shrink-0 text-[#C9A96E]">✓</span>
                    <span className="font-[family-name:var(--font-inter)] text-sm font-light leading-snug text-[#7A6A6E]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tipos */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-14 text-center">
              <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">Tipos</span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] lg:text-5xl">
                Uno para
                <br />
                <em className="text-[#5C3A48]">cada tipo de piel</em>
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {tipos.map((t) => (
                <div key={t.nombre} className="rounded-2xl border border-[#E8C9C1]/60 bg-[#FAF8F5] p-6 lg:p-8">
                  <div className="mb-3 h-px w-8 bg-[#C9A96E]" />
                  <h3 className="mb-2 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#2C2329]">{t.nombre}</h3>
                  <p className="mb-3 font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">{t.descripcion}</p>
                  <span className="inline-block rounded-full bg-[#F2E4DF] px-3 py-1 font-[family-name:var(--font-inter)] text-xs font-medium text-[#8B5E6D]">
                    {t.ideal}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/productos" className="inline-flex items-center gap-2 rounded-full bg-[#5C3A48] px-8 py-3.5 font-[family-name:var(--font-inter)] text-sm font-medium tracking-widest text-[#FAF8F5] uppercase shadow-[0_8px_32px_rgba(92,58,72,0.3)] transition-all hover:bg-[#2C2329]">
                Ver productos disponibles
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#FAF8F5] py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-6 lg:px-12">
            <div className="mb-14 text-center">
              <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">Preguntas frecuentes</span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] lg:text-5xl">
                Todo lo que
                <br />
                <em className="text-[#5C3A48]">necesitás saber</em>
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.pregunta} className="rounded-2xl border border-[#E8C9C1]/60 bg-white p-6 lg:p-8">
                  <h3 className="mb-3 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#2C2329]">{f.pregunta}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">{f.respuesta}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
