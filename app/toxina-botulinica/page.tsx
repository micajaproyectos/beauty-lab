import type { Metadata } from "next";
import Link from "next/link";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Toxina Botulínica en Santiago — Beauty Lab",
  description:
    "Tratamiento de toxina botulínica aplicado por médico cirujana y master inyector certificada. Suaviza arrugas de expresión con resultados naturales. Santiago, Chile.",
};

const areas = [
  { zona: "Frente", descripcion: "Elimina las líneas horizontales que aparecen al levantar las cejas." },
  { zona: "Entrecejo", descripcion: "Suaviza el surco vertical entre las cejas causado por el ceño fruncido." },
  { zona: "Patas de gallo", descripcion: "Reduce las líneas de expresión en el contorno externo de los ojos." },
  { zona: "Labio superior", descripcion: "Corrige las líneas verticales alrededor de la boca y define el arco de Cupido." },
  { zona: "Mentón", descripcion: "Suaviza la textura irregular (piel de naranja) en la zona del mentón." },
  { zona: "Cuello (Nefertiti)", descripcion: "Redefine el óvalo facial y mejora la flacidez del cuello y mandíbula." },
];

const beneficios = [
  "Resultado natural que preserva la expresividad",
  "Procedimiento de 15 a 30 minutos",
  "Sin tiempo de recuperación",
  "Efecto visible en 3 a 7 días",
  "Duración de 4 a 6 meses",
  "Aplicado por médico cirujana certificada",
];

const faqs = [
  {
    pregunta: "¿Cuánto dura el efecto de la toxina botulínica?",
    respuesta:
      "El efecto dura entre 4 y 6 meses en promedio. Con tratamientos periódicos, los músculos se reeducan progresivamente y los resultados pueden prolongarse.",
  },
  {
    pregunta: "¿Duele la aplicación?",
    respuesta:
      "La molestia es mínima. Se utilizan agujas muy finas y, si es necesario, se puede aplicar crema anestésica tópica antes del procedimiento.",
  },
  {
    pregunta: "¿Cuándo empiezo a ver los resultados?",
    respuesta:
      "Los primeros efectos se aprecian entre 3 y 5 días después de la aplicación. El resultado completo se estabiliza alrededor del día 14.",
  },
  {
    pregunta: "¿Se va a notar artificial o congelado?",
    respuesta:
      "No, cuando la aplicación es realizada por un profesional médico con criterio estético. La dosis y los puntos de inyección se diseñan para suavizar sin eliminar la expresión natural.",
  },
  {
    pregunta: "¿Quién puede realizarse este tratamiento?",
    respuesta:
      "La mayoría de los adultos sanos son candidatos. Se realiza una evaluación previa para detectar contraindicaciones como embarazo, lactancia o ciertas enfermedades neuromusculares.",
  },
];

export default function ToxinaBotulinicaPage() {
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
                Toxina Botulínica
              </span>
            </nav>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-3">
                  Tratamiento médico
                </span>
                <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[1.1] text-[#FAF8F5] lg:text-6xl">
                  Toxina
                  <br />
                  <em className="text-[#E8C9C1]">botulínica</em>
                </h1>
              </div>
              <p className="max-w-sm font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#E8C9C1]/70">
                El tratamiento más seguro y efectivo para suavizar líneas de expresión. Resultados naturales en manos de una médico cirujana certificada.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
              {[
                { value: "15–30 min", label: "Duración sesión" },
                { value: "3–7 días", label: "Resultados visibles" },
                { value: "4–6 meses", label: "Duración del efecto" },
                { value: "Sin recuperación", label: "Volvés el mismo día" },
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
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">
                  ¿Qué es?
                </span>
                <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light leading-[1.15] text-[#2C2329] mb-6 lg:text-5xl">
                  Relajación muscular
                  <br />
                  <em className="text-[#5C3A48]">de precisión</em>
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E] mb-4">
                  La toxina botulínica es una proteína purificada que, aplicada en pequeñas dosis, bloquea temporalmente la señal nerviosa en los músculos de la expresión facial. Al relajarlos, las arrugas dinámicas se suavizan de forma natural.
                </p>
                <p className="font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E]">
                  Es el tratamiento estético médico más solicitado en el mundo y, cuando es realizado por un profesional capacitado, tiene un perfil de seguridad ampliamente documentado.
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

        {/* Zonas de tratamiento */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-14 text-center">
              <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">
                Zonas
              </span>
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
              <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">
                Preguntas frecuentes
              </span>
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
