import type { Metadata } from "next";
import Link from "next/link";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Lifting Facial Sin Cirugía en Santiago — Beauty Lab",
  description:
    "Lifting facial no quirúrgico con hilos tensores e hilos revitalizantes. Resultados inmediatos y naturales. Médico cirujana y master inyector certificada en Santiago, Chile.",
};

const tratamientos = [
  {
    numero: "01",
    nombre: "Hilos Tensores",
    descripcion:
      "Hilos de PDO o PLLA que se insertan bajo la piel para tensar y redefinir el óvalo facial de forma inmediata. Estimulan la producción de colágeno y sus efectos continúan mejorando durante meses.",
    duracion: "45–60 min",
    efecto: "12–18 meses",
    ideal: "Flacidez facial, óvalo, papada",
  },
  {
    numero: "02",
    nombre: "Hilos Revitalizantes",
    descripcion:
      "Hilos de menor calibre distribuidos en malla que mejoran la calidad, hidratación y luminosidad de la piel. Ideales como complemento o para etapas iniciales de flacidez.",
    duracion: "30–45 min",
    efecto: "6–12 meses",
    ideal: "Calidad de piel, luminosidad, flacidez inicial",
  },
];

const beneficios = [
  "Efecto lifting visible desde la primera sesión",
  "Sin cirugía ni anestesia general",
  "Recuperación en 24–48 horas",
  "Estimula el colágeno propio",
  "Resultados progresivos y naturales",
  "Procedimiento realizado por médico certificada",
];

const faqs = [
  {
    pregunta: "¿Qué diferencia hay entre hilos tensores e hilos revitalizantes?",
    respuesta:
      "Los hilos tensores tienen mayor calibre y efecto mecánico inmediato: literalmente tensan la piel. Los hilos revitalizantes son más finos, se distribuyen en malla y trabajan principalmente mejorando la calidad de la piel y estimulando colágeno. Pueden combinarse para resultados más completos.",
  },
  {
    pregunta: "¿Duele el procedimiento de hilos?",
    respuesta:
      "Se aplica anestesia local en la zona antes del procedimiento, por lo que la incomodidad es mínima. Puede haber algo de sensibilidad o leve inflamación en las primeras 24–48 horas, que desaparece rápidamente.",
  },
  {
    pregunta: "¿Cuándo se ven los resultados?",
    respuesta:
      "El efecto tensor es visible de forma inmediata. Los resultados continúan mejorando durante las 4–8 semanas posteriores, a medida que se estimula la producción de colágeno.",
  },
  {
    pregunta: "¿Los hilos son seguros?",
    respuesta:
      "Sí. Los hilos utilizados son bioabsorbibles, aprobados para uso médico, y se reabsorben de forma natural con el tiempo. El procedimiento es realizado por la Dra. Solange Ballen Marín, médico cirujana con certificación en técnicas de inyección avanzada.",
  },
];

const proceso = [
  {
    paso: "01",
    titulo: "Diagnóstico",
    descripcion: "Evaluación personalizada de la estructura facial y zonas de pérdida de soporte.",
  },
  {
    paso: "02",
    titulo: "Diseño",
    descripcion: "Trazado de la técnica y cantidad de hilos según el resultado esperado.",
  },
  {
    paso: "03",
    titulo: "Procedimiento",
    descripcion: "Inserción de los hilos bajo anestesia local. Sin cortes ni cicatrices.",
  },
  {
    paso: "04",
    titulo: "Resultados",
    descripcion: "Efecto inmediato que continúa mejorando durante las siguientes semanas.",
  },
];

export default function LiftingFacialPage() {
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
                Lifting Facial
              </span>
            </nav>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-3">
                  Estética Facial Premium
                </span>
                <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[1.1] text-[#FAF8F5] lg:text-6xl">
                  Lifting facial
                  <br />
                  <em className="text-[#E8C9C1]">sin cirugía</em>
                </h1>
              </div>
              <p className="max-w-sm font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#E8C9C1]/70">
                Recupera la firmeza y definición del óvalo facial con hilos bioabsorbibles. Resultados inmediatos y naturales, sin bisturí ni tiempo de recuperación prolongado.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
              {[
                { value: "2", label: "Técnicas especializadas" },
                { value: "Inmediato", label: "Efecto visible" },
                { value: "24–48h", label: "Recuperación" },
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
                  El lifting que
                  <br />
                  <em className="text-[#5C3A48]">no deja huellas</em>
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E] mb-4">
                  El lifting facial con hilos es un procedimiento médico mínimamente invasivo que utiliza hilos bioabsorbibles para tensar la piel y redefinir el contorno facial sin necesidad de cirugía.
                </p>
                <p className="font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E]">
                  Los hilos actúan como un soporte mecánico inmediato y, al mismo tiempo, estimulan la producción natural de colágeno, mejorando la calidad de la piel de forma progresiva durante los meses siguientes.
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
                Técnicas
              </span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] lg:text-5xl">
                Protocolos de
                <br />
                <em className="text-[#5C3A48]">lifting facial</em>
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 max-w-4xl mx-auto">
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

        {/* Proceso */}
        <section className="bg-[#FAF8F5] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-14 text-center">
              <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">
                Proceso
              </span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] lg:text-5xl">
                ¿Cómo es la
                <br />
                <em className="text-[#5C3A48]">experiencia?</em>
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {proceso.map((p) => (
                <div key={p.paso} className="flex flex-col rounded-2xl border border-[#E8C9C1]/60 bg-white p-6">
                  <span className="mb-4 font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#D4A5A0]">
                    {p.paso}
                  </span>
                  <div className="mb-3 h-px w-8 bg-[#C9A96E]" />
                  <h3 className="mb-2 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#2C2329]">
                    {p.titulo}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">
                    {p.descripcion}
                  </p>
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
                Todo lo que
                <br />
                <em className="text-[#5C3A48]">necesitás saber</em>
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.pregunta}
                  className="rounded-2xl border border-[#E8C9C1]/60 bg-[#FAF8F5] p-6 lg:p-8"
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
