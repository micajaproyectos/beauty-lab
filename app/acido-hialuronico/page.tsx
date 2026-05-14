import type { Metadata } from "next";
import Link from "next/link";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Ácido Hialurónico en Santiago — Beauty Lab",
  description:
    "Relleno con ácido hialurónico para restaurar volumen, definir rasgos y corregir surcos. Aplicado por médico cirujana y master inyector certificada en Santiago, Chile.",
};

const areas = [
  { zona: "Labios", descripcion: "Define el contorno, aporta volumen natural y mejora la hidratación labial." },
  { zona: "Pómulos", descripcion: "Restaura el volumen perdido y eleva la estructura media del rostro." },
  { zona: "Surcos nasogenianos", descripcion: "Suaviza los pliegues entre la nariz y la comisura de los labios." },
  { zona: "Ojeras", descripcion: "Reduce las sombras y el hundimiento bajo los ojos para una mirada más descansada." },
  { zona: "Mentón y mandíbula", descripcion: "Proyecta y define el perfil facial para un rostro más armónico." },
  { zona: "Relleno facial global", descripcion: "Reposición estratégica de volúmenes para un resultado de rejuvenecimiento integral." },
];

const beneficios = [
  "Resultados inmediatos tras la sesión",
  "100% reversible con hialuronidasa",
  "Biocompatible y absorbible naturalmente",
  "Sin tiempo de recuperación significativo",
  "Efecto que dura entre 9 y 12 meses",
  "Aplicado con técnica médica de precisión",
];

const faqs = [
  {
    pregunta: "¿Es reversible el ácido hialurónico?",
    respuesta:
      "Sí. El ácido hialurónico puede disolverse en cualquier momento con una enzima llamada hialuronidasa. Esto lo convierte en uno de los tratamientos de relleno más seguros disponibles.",
  },
  {
    pregunta: "¿Cuánto dura el efecto?",
    respuesta:
      "Dependiendo de la zona y el producto utilizado, el efecto dura entre 9 y 12 meses. En áreas con mucho movimiento (como los labios) puede ser algo menor; en zonas estáticas como pómulos, algo mayor.",
  },
  {
    pregunta: "¿Duele el procedimiento?",
    respuesta:
      "La incomodidad es mínima. Se aplica anestesia tópica antes del tratamiento y los productos modernos suelen llevar lidocaína incorporada para mayor confort durante la aplicación.",
  },
  {
    pregunta: "¿Se nota que me hice algo?",
    respuesta:
      "El objetivo es siempre un resultado natural y armonioso. Un buen relleno no debe «notarse», sino mejorar la apariencia de forma sutil. Esto depende en gran medida de la técnica y el criterio estético del profesional.",
  },
  {
    pregunta: "¿Puedo combinarlo con toxina botulínica?",
    respuesta:
      "Sí, es una de las combinaciones más frecuentes. Mientras la toxina botulínica actúa sobre las arrugas dinámicas, el ácido hialurónico repone volumen y suaviza surcos estáticos. Juntos logran un rejuvenecimiento más completo.",
  },
];

export default function AcidoHialuronicoPage() {
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
              <Link href="/rejuvenecimiento-facial" className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60 uppercase transition-colors hover:text-[#E8C9C1]">Rejuvenecimiento Facial</Link>
              <span className="text-[#E8C9C1]/40">/</span>
              <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#C9A96E] uppercase">Ácido Hialurónico</span>
            </nav>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-3">Relleno facial</span>
                <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[1.1] text-[#FAF8F5] lg:text-6xl">
                  Ácido
                  <br />
                  <em className="text-[#E8C9C1]">hialurónico</em>
                </h1>
              </div>
              <p className="max-w-sm font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#E8C9C1]/70">
                Restaura el volumen y la juventud del rostro con resultados inmediatos, naturales y completamente reversibles.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
              {[
                { value: "Inmediato", label: "Resultado visible" },
                { value: "30–45 min", label: "Duración sesión" },
                { value: "9–12 meses", label: "Duración del efecto" },
                { value: "Reversible", label: "Con hialuronidasa" },
              ].map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#C9A96E]">{s.value}</span>
                  <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Qué es */}
        <section className="bg-[#FAF8F5] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
              <div>
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">¿Qué es?</span>
                <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light leading-[1.15] text-[#2C2329] mb-6 lg:text-5xl">
                  Volumen y definición
                  <br />
                  <em className="text-[#5C3A48]">con precisión</em>
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E] mb-4">
                  El ácido hialurónico es una sustancia que el propio cuerpo produce de forma natural. Con la edad, sus niveles disminuyen, lo que genera pérdida de volumen, flacidez y aparición de surcos.
                </p>
                <p className="font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E]">
                  El tratamiento consiste en la inyección de ácido hialurónico reticulado (de alta densidad) en zonas estratégicas del rostro para restaurar la arquitectura facial, corregir surcos y definir rasgos, logrando resultados visibles de inmediato.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {beneficios.map((b) => (
                  <div key={b} className="flex items-start gap-3 rounded-2xl border border-[#E8C9C1]/60 bg-white p-5">
                    <span className="mt-0.5 flex-shrink-0 text-[#C9A96E]">✓</span>
                    <span className="font-[family-name:var(--font-inter)] text-sm font-light leading-snug text-[#7A6A6E]">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Zonas */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-14 text-center">
              <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">Zonas</span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] lg:text-5xl">
                Áreas de
                <br />
                <em className="text-[#5C3A48]">tratamiento</em>
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {areas.map((a) => (
                <div key={a.zona} className="rounded-2xl border border-[#E8C9C1]/60 bg-[#FAF8F5] p-6">
                  <div className="mb-3 h-px w-8 bg-[#C9A96E]" />
                  <h3 className="mb-2 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#2C2329]">{a.zona}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">{a.descripcion}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/servicios" className="inline-flex items-center gap-2 rounded-full bg-[#5C3A48] px-8 py-3.5 font-[family-name:var(--font-inter)] text-sm font-medium tracking-widest text-[#FAF8F5] uppercase shadow-[0_8px_32px_rgba(92,58,72,0.3)] transition-all hover:bg-[#2C2329]">
                Cotizar tratamiento
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
