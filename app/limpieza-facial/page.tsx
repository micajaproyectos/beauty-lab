import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Limpieza Facial Profunda en Santiago — Beauty Lab",
  description:
    "Limpieza facial profunda con extracción, exfoliación e hidratación. Tratamiento base para mantener una piel sana y preparada para cualquier procedimiento estético. Santiago, Chile.",
};

const beneficios = [
  "Elimina impurezas, células muertas y exceso de sebo",
  "Previene la formación de puntos negros y espinillas",
  "Mejora la textura y luminosidad de la piel",
  "Potencia los resultados de otros tratamientos estéticos",
  "Apta para todo tipo de pieles",
];

const pasos = [
  {
    paso: "01",
    titulo: "Diagnóstico",
    descripcion: "Análisis del tipo de piel, zonas de congestión, nivel de hidratación y necesidades específicas antes de iniciar.",
  },
  {
    paso: "02",
    titulo: "Limpieza inicial",
    descripcion: "Remoción de maquillaje, SPF e impurezas superficiales con productos formulados según el tipo de piel.",
  },
  {
    paso: "03",
    titulo: "Exfoliación",
    descripcion: "Eliminación de células muertas para desobstruir los poros y mejorar la textura de la superficie cutánea.",
  },
  {
    paso: "04",
    titulo: "Vapor y extracción",
    descripcion: "Apertura del poro con vapor tibio y extracción manual de comedones y puntos negros de forma controlada.",
  },
  {
    paso: "05",
    titulo: "Tratamiento calmante",
    descripcion: "Aplicación de activos calmantes y antiinflamatorios para calmar la piel post-extracción y minimizar rojeces.",
  },
  {
    paso: "06",
    titulo: "Hidratación y cierre de poro",
    descripcion: "Finalización con hidratante y tónico de poro para sellar el tratamiento y proteger la barrera cutánea.",
  },
];

const faqs = [
  {
    pregunta: "¿Con qué frecuencia debo hacerme una limpieza facial?",
    respuesta:
      "Lo ideal es realizarla cada 4 a 6 semanas, que es el tiempo que tarda la piel en completar su ciclo de renovación celular. Pieles grasas o con tendencia acneica pueden beneficiarse de una frecuencia mensual; pieles secas o sensibles, cada 6 a 8 semanas.",
  },
  {
    pregunta: "¿Duele la extracción de puntos negros?",
    respuesta:
      "Puede haber algo de sensibilidad durante la extracción, especialmente en zonas como la nariz y el mentón. Sin embargo, el procedimiento se realiza de forma controlada y con el poro previamente ablandado con vapor para minimizar la molestia.",
  },
  {
    pregunta: "¿Mi piel queda roja después del tratamiento?",
    respuesta:
      "Es normal que haya algo de enrojecimiento temporal después de la extracción, especialmente en pieles sensibles. Suele desaparecer en pocas horas. Por eso recomendamos agendar la sesión un día que no tengas compromisos sociales importantes inmediatamente después.",
  },
  {
    pregunta: "¿Puedo maquillarme después de la limpieza facial?",
    respuesta:
      "Lo ideal es evitar el maquillaje durante las primeras 12 a 24 horas para permitir que la piel se recupere y los poros se cierren correctamente. Si necesitás usar algo, optá por productos no comedogénicos y ligeros.",
  },
  {
    pregunta: "¿La limpieza facial funciona para piel grasa y acneica?",
    respuesta:
      "Sí, es uno de los tipos de piel que más se beneficia. La limpieza facial profunda en pieles grasas desobstruye los poros congestionados, controla el exceso de sebo y reduce la aparición de puntos negros. Para el acné no inflamatorio (puntos negros y blancos) es especialmente efectiva. En casos de acné inflamatorio activo, el protocolo se adapta para no irritar las lesiones y se complementa con tratamientos específicos.",
  },
  {
    pregunta: "¿Es necesaria antes de otros tratamientos estéticos?",
    respuesta:
      "Muy recomendable. Una piel limpia y desobstruida absorbe mejor los activos de tratamientos como bioestimulación o ácido hialurónico, y reduce el riesgo de reacciones en procedimientos de inyección. Muchos protocolos comienzan con una limpieza facial.",
  },
  {
    pregunta: "¿Qué cuidados debo tener después?",
    respuesta:
      "Hidratación inmediata, evitar exposición solar directa durante 24 horas, no tocar la cara con las manos, y aplicar protector solar al día siguiente. Evitá exfoliantes o activos fuertes (retinol, ácidos) por al menos 48 horas post-tratamiento.",
  },
];

export default function LimpiezaFacialPage() {
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
              <Link href="/servicios" className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60 uppercase transition-colors hover:text-[#E8C9C1]">
                Tratamientos
              </Link>
              <span className="text-[#E8C9C1]/40">/</span>
              <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#C9A96E] uppercase">
                Limpieza Facial
              </span>
            </nav>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-3">
                  Limpieza Facial · Santiago
                </span>
                <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[1.1] text-[#FAF8F5] lg:text-6xl">
                  Limpieza facial
                  <br />
                  <em className="text-[#E8C9C1]">profunda en Santiago</em>
                </h1>
              </div>
              <p className="max-w-sm font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#E8C9C1]/70">
                El tratamiento base de cualquier rutina de cuidado profesional. Piel limpia, desobstruida y luminosa desde la primera sesión.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
              {[
                { value: "60–90 min", label: "Duración sesión" },
                { value: "4–6 sem", label: "Frecuencia ideal" },
                { value: "Inmediato", label: "Resultado visible" },
                { value: "Todo tipo", label: "De pieles" },
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
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
              {/* Imagen */}
              <div className="relative overflow-hidden rounded-[40px] shadow-[0_32px_80px_rgba(92,58,72,0.18)]">
                <Image
                  src="/limpiezafacial.webp"
                  alt="Limpieza facial profunda — Beauty Lab"
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
                  ¿Qué es?
                </span>
                <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light leading-[1.15] text-[#2C2329] mb-6 lg:text-5xl">
                  ¿Qué es la
                  <br />
                  <em className="text-[#5C3A48]">limpieza facial?</em>
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E] mb-4">
                  La limpieza facial profunda es un tratamiento profesional que elimina las impurezas acumuladas en los poros, las células muertas de la superficie y el exceso de sebo que la limpieza diaria en casa no logra remover. También conocida como limpieza de cutis o limpieza de cara profesional, va mucho más allá de lo que podés lograr con un limpiador en casa.
                </p>
                <p className="font-[family-name:var(--font-inter)] text-base font-light leading-relaxed text-[#7A6A6E] mb-8">
                  Es el tratamiento base de cualquier protocolo de cuidado facial: prepara la piel para absorber mejor los activos de otros tratamientos, previene la formación de comedones y mejora visiblemente la textura y luminosidad desde la primera sesión.
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {beneficios.map((b) => (
                    <div key={b} className="flex items-center gap-3 rounded-xl border border-[#E8C9C1]/60 bg-white px-5 py-3">
                      <span className="flex-shrink-0 text-[#C9A96E]">✓</span>
                      <span className="font-[family-name:var(--font-inter)] text-sm font-light text-[#7A6A6E]">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-14 text-center">
              <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">
                Proceso
              </span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] lg:text-5xl">
                Cómo es la
                <br />
                <em className="text-[#5C3A48]">limpieza facial profunda</em>
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pasos.map((p) => (
                <div key={p.paso} className="flex flex-col rounded-2xl border border-[#E8C9C1]/60 bg-[#FAF8F5] p-6">
                  <span className="mb-4 font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#D4A5A0]">{p.paso}</span>
                  <div className="mb-3 h-px w-8 bg-[#C9A96E]" />
                  <h3 className="mb-2 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#2C2329]">{p.titulo}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">{p.descripcion}</p>
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
                Preguntas sobre
                <br />
                <em className="text-[#5C3A48]">limpieza facial</em>
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
