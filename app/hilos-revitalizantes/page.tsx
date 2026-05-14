import type { Metadata } from "next";
import Link from "next/link";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Hilos Revitalizantes en Santiago — Beauty Lab",
  description:
    "Hilos revitalizantes para mejorar la calidad, hidratación y luminosidad de la piel. Tratamiento mínimamente invasivo. Médico cirujana certificada en Santiago, Chile.",
};

const beneficios = [
  "Mejora la hidratación y luminosidad de la piel",
  "Estimula la producción de colágeno",
  "Ideal para flacidez incipiente",
  "Sin tiempo de recuperación significativo",
  "Complementa los hilos tensores",
  "Resultados progresivos y naturales",
];

const diferencias = [
  {
    aspecto: "Hilos Revitalizantes",
    calibre: "Fino (mono o malla)",
    mecanismo: "Bioestimulación + hidratación",
    resultado: "Mejora de calidad de piel",
    ideal: "Flacidez inicial, opacidad, piel deshidratada",
  },
  {
    aspecto: "Hilos Tensores",
    calibre: "Mayor calibre con ganchos",
    mecanismo: "Tensado mecánico + bioestimulación",
    resultado: "Lifting inmediato del óvalo facial",
    ideal: "Flacidez moderada, redefinición del contorno",
  },
];

const faqs = [
  {
    pregunta: "¿Cuál es la diferencia entre hilos revitalizantes e hilos tensores?",
    respuesta:
      "Los hilos revitalizantes son más finos y actúan principalmente mejorando la calidad de la piel: hidratación, luminosidad y estimulación de colágeno. Los hilos tensores tienen mayor calibre y producen un efecto mecánico inmediato de lifting. Pueden combinarse para resultados más completos.",
  },
  {
    pregunta: "¿Duele el procedimiento?",
    respuesta:
      "Se aplica anestesia local antes de la inserción de los hilos, por lo que la incomodidad es mínima. Puede haber algo de sensibilidad leve en las primeras 24 horas.",
  },
  {
    pregunta: "¿Cuándo se ven los resultados?",
    respuesta:
      "La mejora en la hidratación y luminosidad es progresiva. Se aprecia desde las primeras semanas y continúa mejorando durante los meses siguientes a medida que se estimula el colágeno.",
  },
  {
    pregunta: "¿Con qué frecuencia se realiza?",
    respuesta:
      "La duración es de 6 a 12 meses aproximadamente. Como tratamiento de mantenimiento, se puede realizar cada 6 meses para conservar y potenciar los resultados.",
  },
  {
    pregunta: "¿Puedo combinarlo con otros tratamientos?",
    respuesta:
      "Sí. Los hilos revitalizantes se combinan con frecuencia con hilos tensores, toxina botulínica y ácido hialurónico para protocolos de rejuvenecimiento integrales.",
  },
];

export default function HilosRevitalizantesPage() {
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
              <Link href="/lifting-facial" className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60 uppercase transition-colors hover:text-[#E8C9C1]">Lifting Facial</Link>
              <span className="text-[#E8C9C1]/40">/</span>
              <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#C9A96E] uppercase">Hilos Revitalizantes</span>
            </nav>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-3">Revitalización cutánea</span>
                <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[1.1] text-[#FAF8F5] lg:text-6xl">
                  Hilos
                  <br />
                  <em className="text-[#E8C9C1]">revitalizantes</em>
                </h1>
              </div>
              <p className="max-w-sm font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#E8C9C1]/70">
                Mejora la calidad, hidratación y luminosidad de tu piel con un tratamiento mínimamente invasivo de resultados progresivos y naturales.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
              {[
                { value: "30–45 min", label: "Duración sesión" },
                { value: "6–12 meses", label: "Duración del efecto" },
                { value: "24–48 h", label: "Recuperación" },
                { value: "Progresivo", label: "Mejora continua" },
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
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">¿Qué son?</span>
                <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light leading-[1.15] text-[#2C2329] mb-6 lg:text-5xl">
                  Colágeno y brillo
                  <br />
                  <em className="text-[#5C3A48]">desde adentro</em>
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E] mb-4">
                  Los hilos revitalizantes son hilos de PDO (polidioxanona) de calibre fino que se insertan en la dermis formando una malla uniforme. Su objetivo principal no es tensar sino bioestimular: al degradarse, generan una respuesta inflamatoria controlada que activa la producción de colágeno y elastina.
                </p>
                <p className="font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E]">
                  El resultado es una piel más hidratada, luminosa y firme, con mejora de la textura superficial y reducción de la laxitud incipiente.
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

        {/* Comparativa */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-6 lg:px-12">
            <div className="mb-14 text-center">
              <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">Comparativa</span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] lg:text-5xl">
                Revitalizantes vs.
                <br />
                <em className="text-[#5C3A48]">tensores</em>
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {diferencias.map((d) => (
                <div key={d.aspecto} className="rounded-3xl border border-[#E8C9C1]/60 bg-[#FAF8F5] p-8">
                  <h3 className="mb-5 font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2C2329]">{d.aspecto}</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Calibre", value: d.calibre },
                      { label: "Mecanismo", value: d.mecanismo },
                      { label: "Resultado", value: d.resultado },
                      { label: "Ideal para", value: d.ideal },
                    ].map((item) => (
                      <div key={item.label} className="border-t border-[#E8C9C1]/60 pt-3">
                        <span className="font-[family-name:var(--font-inter)] text-xs font-light text-[#B5A8AC]">{item.label}</span>
                        <p className="mt-0.5 font-[family-name:var(--font-inter)] text-sm font-light text-[#5C3A48]">{item.value}</p>
                      </div>
                    ))}
                  </div>
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
