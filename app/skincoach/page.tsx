import type { Metadata } from "next";
import Link from "next/link";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "SkinCoach — Asesoría Personalizada de Skincare — Beauty Lab",
  description:
    "Asesoría personalizada de skincare con diagnóstico de piel, rutina a medida y seguimiento continuo. Dra. Solange Ballen Marín, especialista en medicina estética en Santiago, Chile.",
};

const incluye = [
  { titulo: "Diagnóstico de piel", descripcion: "Análisis detallado del tipo de piel, necesidades específicas y factores que afectan su condición (estilo de vida, alimentación, factores ambientales)." },
  { titulo: "Rutina personalizada", descripcion: "Diseño de una rutina de skincare paso a paso adaptada a tu tipo de piel, objetivos y presupuesto. Mañana y noche." },
  { titulo: "Selección de productos", descripcion: "Recomendación de ingredientes activos y productos específicos, sin marcas innecesarias. Solo lo que tu piel realmente necesita." },
  { titulo: "Educación en skincare", descripcion: "Entendés qué hace cada producto, por qué lo usás y cómo leer etiquetas para tomar mejores decisiones de compra." },
  { titulo: "Seguimiento continuo", descripcion: "Acompañamiento posterior para ajustar la rutina según la evolución de tu piel, cambios de estación o nuevos objetivos." },
  { titulo: "Integración con tratamientos", descripcion: "Si realizás tratamientos médicos, el SkinCoach diseña la rutina complementaria para potenciar y mantener los resultados." },
];

const para_quien = [
  "Tenés la piel reactiva o sensible y no sabés qué productos usar",
  "Querés mejorar manchas, textura o poros sin saber por dónde empezar",
  "Gastás en productos que no ven resultados",
  "Acabás de realizar un tratamiento médico estético y querés maximizar el resultado",
  "Querés empezar a cuidar tu piel con criterio médico, no solo cosmético",
  "Buscás una rutina simple, efectiva y adaptada a tu vida real",
];

const faqs = [
  {
    pregunta: "¿Qué es exactamente el SkinCoach?",
    respuesta:
      "El SkinCoach es una asesoría personalizada de skincare realizada por la Dra. Solange Ballen Marín. A diferencia de una consulta estética convencional, el foco está en educarte y diseñar una rutina de cuidado diario que funcione para tu piel específicamente.",
  },
  {
    pregunta: "¿Es presencial u online?",
    respuesta:
      "Puede ser de ambas formas. La sesión inicial suele ser presencial para el diagnóstico de piel, pero el seguimiento posterior puede realizarse de forma online por WhatsApp o videollamada.",
  },
  {
    pregunta: "¿Cuánto dura la sesión?",
    respuesta:
      "La sesión inicial de diagnóstico y rutina dura aproximadamente 60 minutos. Las sesiones de seguimiento son más breves, de 20 a 30 minutos.",
  },
  {
    pregunta: "¿Me van a recomendar comprar muchos productos?",
    respuesta:
      "No. El enfoque del SkinCoach es simplificar. Se priorizan rutinas efectivas con pocos pasos bien elegidos. La cantidad de productos depende de tus objetivos, no de una lista genérica.",
  },
  {
    pregunta: "¿Sirve si ya me hago tratamientos médicos estéticos?",
    respuesta:
      "Especialmente en ese caso. El cuidado diario de la piel potencia y prolonga los resultados de cualquier tratamiento médico. El SkinCoach diseña la rutina complementaria a tus procedimientos.",
  },
];

export default function SkinCoachPage() {
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
              <Link href="/servicios" className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60 uppercase transition-colors hover:text-[#E8C9C1]">Tratamientos</Link>
              <span className="text-[#E8C9C1]/40">/</span>
              <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#C9A96E] uppercase">SkinCoach</span>
            </nav>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-3">Asesoría personalizada</span>
                <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[1.1] text-[#FAF8F5] lg:text-6xl">
                  Skin
                  <em className="text-[#E8C9C1]">Coach</em>
                </h1>
              </div>
              <p className="max-w-sm font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#E8C9C1]/70">
                Tu rutina de skincare diseñada por una médico especialista. Diagnóstico de piel, selección de productos y seguimiento personalizado.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
              {[
                { value: "60 min", label: "Sesión inicial" },
                { value: "1:1", label: "Atención exclusiva" },
                { value: "Presencial u online", label: "Modalidad" },
                { value: "Seguimiento", label: "Acompañamiento continuo" },
              ].map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#C9A96E]">{s.value}</span>
                  <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Qué incluye */}
        <section className="bg-[#FAF8F5] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-14 text-center">
              <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">Qué incluye</span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] lg:text-5xl">
                Una asesoría
                <br />
                <em className="text-[#5C3A48]">completa</em>
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {incluye.map((item, i) => (
                <div key={item.titulo} className="group flex flex-col rounded-3xl border border-[#E8C9C1]/60 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(92,58,72,0.1)]">
                  <span className="mb-4 font-[family-name:var(--font-cormorant)] text-5xl font-light text-[#D4A5A0]">0{i + 1}</span>
                  <div className="mb-4 h-px w-8 bg-[#C9A96E]" />
                  <h3 className="mb-3 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#2C2329]">{item.titulo}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">{item.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Para quién */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
              <div>
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">¿Para quién?</span>
                <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light leading-[1.15] text-[#2C2329] mb-6 lg:text-5xl">
                  El SkinCoach
                  <br />
                  <em className="text-[#5C3A48]">es para vos si...</em>
                </h2>
              </div>
              <div className="space-y-4">
                {para_quien.map((item) => (
                  <div key={item} className="flex items-start gap-4 rounded-2xl border border-[#E8C9C1]/60 bg-[#FAF8F5] px-6 py-4">
                    <span className="mt-0.5 flex-shrink-0 text-[#C9A96E]">✓</span>
                    <span className="font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 text-center">
              <Link href="/servicios" className="inline-flex items-center gap-2 rounded-full bg-[#5C3A48] px-8 py-3.5 font-[family-name:var(--font-inter)] text-sm font-medium tracking-widest text-[#FAF8F5] uppercase shadow-[0_8px_32px_rgba(92,58,72,0.3)] transition-all hover:bg-[#2C2329]">
                Agendar SkinCoach
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
