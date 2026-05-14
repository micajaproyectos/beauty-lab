import type { Metadata } from "next";
import Link from "next/link";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Rejuvenecimiento Facial en Santiago — Beauty Lab",
  description:
    "Tratamientos de rejuvenecimiento facial con toxina botulínica, ácido hialurónico y bioestimulación. Médico cirujana y master inyector certificada. Agenda tu diagnóstico gratuito en Santiago.",
};

const tratamientos = [
  {
    numero: "01",
    nombre: "Toxina Botulínica",
    descripcion:
      "Relaja los músculos responsables de las líneas de expresión, suavizando arrugas en frente, entrecejo y patas de gallo. Resultados naturales que preservan tu expresividad.",
    duracion: "15–30 min",
    efecto: "4–6 meses",
    ideal: "Líneas de expresión, arrugas dinámicas",
  },
  {
    numero: "02",
    nombre: "Ácido Hialurónico",
    descripcion:
      "Restaura el volumen y la hidratación perdidos con la edad. Ideal para labios, pómulos y surcos nasogenianos. Resultados inmediatos y completamente reversibles.",
    duracion: "30–45 min",
    efecto: "9–12 meses",
    ideal: "Pérdida de volumen, surcos, labios",
  },
  {
    numero: "03",
    nombre: "Bioestimulación",
    descripcion:
      "Estimula la producción de colágeno desde adentro. Mejora la calidad, luminosidad y elasticidad de la piel de forma progresiva y duradera.",
    duracion: "30–60 min",
    efecto: "12–18 meses",
    ideal: "Flacidez incipiente, calidad de piel",
  },
];

const beneficios = [
  "Resultados naturales, sin aspecto artificial",
  "Procedimientos ambulatorios sin internación",
  "Mínimo tiempo de recuperación",
  "Diagnóstico personalizado antes de cada tratamiento",
  "Técnicas avaladas por evidencia científica",
  "Médico cirujana certificada como Master Inyector",
];

const faqs = [
  {
    pregunta: "¿Cuánto dura el efecto del rejuvenecimiento facial?",
    respuesta:
      "Depende del tratamiento: la toxina botulínica dura entre 4 y 6 meses, el ácido hialurónico entre 9 y 12 meses, y la bioestimulación puede durar hasta 18 meses. Con mantenimiento periódico, los resultados se potencian.",
  },
  {
    pregunta: "¿Duele el procedimiento?",
    respuesta:
      "La molestia es mínima. Se utilizan agujas muy finas y, cuando es necesario, se aplica anestesia tópica antes del tratamiento para mayor comodidad.",
  },
  {
    pregunta: "¿Puedo combinar distintos tratamientos?",
    respuesta:
      "Sí. Muchas veces se combinan toxina botulínica con ácido hialurónico para resultados más completos. La Dra. Solange evaluará tu caso y recomendará el protocolo más adecuado.",
  },
  {
    pregunta: "¿Cuándo veo los resultados?",
    respuesta:
      "El ácido hialurónico muestra resultados inmediatos. La toxina botulínica actúa en 3 a 7 días. La bioestimulación es progresiva y se aprecia plenamente a las 4–6 semanas.",
  },
];

export default function RejuvenecimientoFacialPage() {
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
              <Link
                href="/"
                className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60 uppercase transition-colors hover:text-[#E8C9C1]"
              >
                Inicio
              </Link>
              <span className="text-[#E8C9C1]/40">/</span>
              <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#C9A96E] uppercase">
                Rejuvenecimiento Facial
              </span>
            </nav>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-3">
                  Estética Facial Premium
                </span>
                <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[1.1] text-[#FAF8F5] lg:text-6xl">
                  Rejuvenecimiento
                  <br />
                  <em className="text-[#E8C9C1]">facial</em>
                </h1>
              </div>
              <p className="max-w-sm font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#E8C9C1]/70">
                Tratamientos médicos personalizados para recuperar la juventud y luminosidad de tu piel, con resultados naturales y sin cirugía.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
              {[
                { value: "3", label: "Tratamientos especializados" },
                { value: "Sin cirugía", label: "Procedimientos ambulatorios" },
                { value: "94%", label: "Satisfacción" },
                { value: "1:1", label: "Atención exclusiva" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-1.5">
                  <span className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#C9A96E]">
                    {stat.value}
                  </span>
                  <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60">
                    {stat.label}
                  </span>
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
                  Ciencia al servicio
                  <br />
                  <em className="text-[#5C3A48]">de tu piel</em>
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E] mb-4">
                  El rejuvenecimiento facial médico utiliza técnicas de inyección avanzada para restaurar los tejidos, reponer el volumen perdido y estimular la producción natural de colágeno.
                </p>
                <p className="font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E]">
                  A diferencia de los tratamientos estéticos convencionales, estos procedimientos son realizados por una médico cirujana certificada, garantizando seguridad, precisión y resultados adaptados a tu anatomía.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {beneficios.map((b) => (
                  <div
                    key={b}
                    className="flex items-start gap-3 rounded-2xl border border-[#E8C9C1]/60 bg-white p-5"
                  >
                    <span className="mt-0.5 flex-shrink-0 text-[#C9A96E]">✓</span>
                    <span className="font-[family-name:var(--font-inter)] text-sm font-light leading-snug text-[#7A6A6E]">
                      {b}
                    </span>
                  </div>
                ))}
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
                Nuestros protocolos de
                <br />
                <em className="text-[#5C3A48]">rejuvenecimiento</em>
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {tratamientos.map((t) => (
                <div
                  key={t.nombre}
                  className="group flex flex-col rounded-3xl border border-[#E8C9C1]/60 bg-[#FAF8F5] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(92,58,72,0.1)]"
                >
                  <span className="mb-4 font-[family-name:var(--font-cormorant)] text-5xl font-light text-[#D4A5A0]">
                    {t.numero}
                  </span>
                  <div className="mb-4 h-px w-8 bg-[#C9A96E]" />
                  <h3 className="mb-3 font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2C2329]">
                    {t.nombre}
                  </h3>
                  <p className="mb-6 flex-1 font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">
                    {t.descripcion}
                  </p>
                  <div className="space-y-2 border-t border-[#E8C9C1]/60 pt-5">
                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-inter)] text-xs font-light text-[#B5A8AC]">
                        Duración sesión
                      </span>
                      <span className="font-[family-name:var(--font-inter)] text-xs font-medium text-[#5C3A48]">
                        {t.duracion}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-inter)] text-xs font-light text-[#B5A8AC]">
                        Efecto
                      </span>
                      <span className="font-[family-name:var(--font-inter)] text-xs font-medium text-[#5C3A48]">
                        {t.efecto}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-[family-name:var(--font-inter)] text-xs font-light text-[#B5A8AC]">
                        Ideal para
                      </span>
                      <span className="font-[family-name:var(--font-inter)] text-xs font-medium text-right text-[#5C3A48]">
                        {t.ideal}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 rounded-full bg-[#5C3A48] px-8 py-3.5 font-[family-name:var(--font-inter)] text-sm font-medium tracking-widest text-[#FAF8F5] uppercase shadow-[0_8px_32px_rgba(92,58,72,0.3)] transition-all hover:bg-[#2C2329]"
              >
                Ver todos los tratamientos y cotizar
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
              {faqs.map((faq) => (
                <div
                  key={faq.pregunta}
                  className="rounded-2xl border border-[#E8C9C1]/60 bg-white p-6 lg:p-8"
                >
                  <h3 className="mb-3 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#2C2329]">
                    {faq.pregunta}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">
                    {faq.respuesta}
                  </p>
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
