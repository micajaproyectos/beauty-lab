import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Rejuvenecimiento Facial en Santiago — Beauty Lab",
  description:
    "Rejuvenecimiento facial en Las Condes, Santiago. Toxina botulínica, ácido hialurónico y bioestimulación realizados por médico cirujana certificada. Av. El Bosque Nte. 0226, dpto. 302. Agenda tu diagnóstico en Beauty Lab.",
};

const razones = [
  "Médico cirujana · Master Inyector certificada",
  "Diagnóstico personalizado incluido",
  "Sin cirugía · Sin internación · Sin recuperación",
  "Resultados naturales, no artificiales",
];

const tratamientos = [
  {
    numero: "01",
    nombre: "Toxina Botulínica",
    descripcion: "Suaviza líneas de expresión en frente, entrecejo y patas de gallo. Resultados en 3–7 días.",
    efecto: "4–6 meses",
  },
  {
    numero: "02",
    nombre: "Ácido Hialurónico",
    descripcion: "Restaura volumen en pómulos, labios y surcos. Resultados inmediatos y reversibles.",
    efecto: "9–12 meses",
  },
  {
    numero: "03",
    nombre: "Bioestimulación",
    descripcion: "Estimula colágeno propio. Mejora textura, luminosidad y flacidez de forma progresiva.",
    efecto: "12–18 meses",
  },
];

const pasos = [
  { numero: "01", texto: "Agendas tu hora online o por WhatsApp" },
  { numero: "02", texto: "Diagnóstico gratuito con la Dra. Solange" },
  { numero: "03", texto: "Protocolo personalizado según tu caso" },
  { numero: "04", texto: "Procedimiento en nuestra clínica en Las Condes" },
];

const faqs = [
  {
    pregunta: "¿Cuánto cuesta el rejuvenecimiento facial en Santiago?",
    respuesta:
      "El valor varía según el tratamiento y la cantidad de producto. Se cotiza de forma personalizada después del diagnóstico gratuito.",
  },
  {
    pregunta: "¿Dónde está Beauty Lab en Santiago?",
    respuesta:
      "Nos encontramos en Av. El Bosque Nte. 0226, dpto. 302, Las Condes, Santiago. Fácil acceso en transporte público y estacionamiento en el sector.",
  },
  {
    pregunta: "¿Cuántas sesiones necesito?",
    respuesta:
      "Depende del tratamiento. Muchos casos se resuelven en una sola sesión. La Dra. Solange te indicará el plan adecuado en el diagnóstico.",
  },
  {
    pregunta: "¿Qué diferencia a Beauty Lab de otras clínicas en Santiago?",
    respuesta:
      "Todos los procedimientos los realiza directamente una médico cirujana certificada como Master Inyector. Atención 1:1, sin delegación.",
  },
];

export default function RejuvenecimientoFacialSantiagoPage() {
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
              <Link href="/" className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60 uppercase transition-colors hover:text-[#E8C9C1]">
                Inicio
              </Link>
              <span className="text-[#E8C9C1]/40">/</span>
              <Link href="/rejuvenecimiento-facial" className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60 uppercase transition-colors hover:text-[#E8C9C1]">
                Rejuvenecimiento Facial
              </Link>
              <span className="text-[#E8C9C1]/40">/</span>
              <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#C9A96E] uppercase">
                Santiago
              </span>
            </nav>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-3">
                  Beauty Lab · Las Condes, Santiago
                </span>
                <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[1.1] text-[#FAF8F5] lg:text-6xl">
                  Rejuvenecimiento
                  <br />
                  <em className="text-[#E8C9C1]">facial en Santiago</em>
                </h1>
              </div>
              <p className="max-w-sm font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#E8C9C1]/70">
                Procedimientos médicos sin cirugía. Resultados naturales desde la primera sesión.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
              {[
                { value: "Sin cirugía", label: "Procedimientos" },
                { value: "1 sesión", label: "Resultados visibles" },
                { value: "Médico", label: "Cirujana certificada" },
                { value: "1:1", label: "Atención exclusiva" },
              ].map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#C9A96E]">{s.value}</span>
                  <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Por qué Beauty Lab */}
        <section className="bg-[#FAF8F5] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
              {/* Imagen */}
              <div className="relative overflow-hidden rounded-[40px] shadow-[0_32px_80px_rgba(92,58,72,0.18)]">
                <Image
                  src="/rejuvenecimiento.webp"
                  alt="Rejuvenecimiento facial en Santiago — Beauty Lab"
                  width={700}
                  height={900}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-t from-[#2C2329]/20 to-transparent pointer-events-none" />
              </div>
              {/* Texto */}
              <div>
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">
                  Por qué elegirnos
                </span>
                <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light leading-[1.15] text-[#2C2329] mb-6 lg:text-5xl">
                  ¿Por qué Beauty Lab
                  <br />
                  <em className="text-[#5C3A48]">en Santiago?</em>
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E] mb-6">
                  No delegamos. Cada procedimiento lo realiza directamente la Dra. Solange, médico cirujana y Master Inyector certificada. Diagnóstico personalizado antes de cada tratamiento, sin protocolos genéricos.
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {razones.map((r) => (
                    <div key={r} className="flex items-center gap-3 rounded-xl border border-[#E8C9C1]/60 bg-white px-5 py-4">
                      <span className="flex-shrink-0 text-[#C9A96E]">✓</span>
                      <span className="font-[family-name:var(--font-inter)] text-sm font-light text-[#7A6A6E]">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tratamientos */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-14 text-center">
              <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">
                Tratamientos
              </span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] lg:text-5xl">
                Tratamientos de rejuvenecimiento
                <br />
                <em className="text-[#5C3A48]">facial en Santiago</em>
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {tratamientos.map((t) => (
                <div key={t.nombre} className="flex flex-col rounded-3xl border border-[#E8C9C1]/60 bg-[#FAF8F5] p-8">
                  <span className="mb-4 font-[family-name:var(--font-cormorant)] text-5xl font-light text-[#D4A5A0]">{t.numero}</span>
                  <div className="mb-4 h-px w-8 bg-[#C9A96E]" />
                  <h3 className="mb-3 font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2C2329]">{t.nombre}</h3>
                  <p className="mb-6 flex-1 font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">{t.descripcion}</p>
                  <div className="border-t border-[#E8C9C1]/60 pt-4 flex items-center justify-between">
                    <span className="font-[family-name:var(--font-inter)] text-xs font-light text-[#B5A8AC]">Duración efecto</span>
                    <span className="font-[family-name:var(--font-inter)] text-xs font-medium text-[#5C3A48]">{t.efecto}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/servicios" className="inline-flex items-center gap-2 rounded-full bg-[#5C3A48] px-8 py-3.5 font-[family-name:var(--font-inter)] text-sm font-medium tracking-widest text-[#FAF8F5] uppercase shadow-[0_8px_32px_rgba(92,58,72,0.3)] transition-all hover:bg-[#2C2329]">
                Cotizar mi tratamiento
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="bg-[#FAF8F5] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-14 text-center">
              <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">
                Proceso
              </span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] lg:text-5xl">
                ¿Cómo es tu primera
                <br />
                <em className="text-[#5C3A48]">consulta en Santiago?</em>
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pasos.map((p) => (
                <div key={p.numero} className="flex flex-col rounded-2xl border border-[#E8C9C1]/60 bg-white p-6">
                  <span className="mb-4 font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#D4A5A0]">{p.numero}</span>
                  <div className="mb-3 h-px w-8 bg-[#C9A96E]" />
                  <p className="font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">{p.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-6 lg:px-12">
            <div className="mb-14 text-center">
              <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">
                Preguntas frecuentes
              </span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] lg:text-5xl">
                Preguntas sobre rejuvenecimiento
                <br />
                <em className="text-[#5C3A48]">facial en Santiago</em>
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.pregunta} className="rounded-2xl border border-[#E8C9C1]/60 bg-[#FAF8F5] p-6 lg:p-8">
                  <h3 className="mb-3 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#2C2329]">{f.pregunta}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">{f.respuesta}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ubicación */}
        <section className="bg-[#FAF8F5] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-10 text-center">
              <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">
                Ubicación
              </span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] lg:text-5xl">
                Encuéntranos
                <br />
                <em className="text-[#5C3A48]">en Las Condes</em>
              </h2>
              <p className="mt-4 font-[family-name:var(--font-inter)] text-sm font-light text-[#7A6A6E]">
                Av. El Bosque Nte. 0226, dpto. 302 · Las Condes, Santiago
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-[0_16px_48px_rgba(92,58,72,0.12)]">
              <iframe
                src="https://maps.google.com/maps?q=Av.+El+Bosque+Norte+0226,+Las+Condes,+Santiago,+Chile&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Beauty Lab — Av. El Bosque Nte. 0226, Las Condes, Santiago"
              />
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
