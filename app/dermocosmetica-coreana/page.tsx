import type { Metadata } from "next";
import Link from "next/link";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Dermocosmética Coreana — K-Beauty Premium — Beauty Lab",
  description:
    "Dermocosmética coreana K-Beauty seleccionada con criterio médico. Ingredientes activos, texturas innovadoras y rutinas personalizadas para cada tipo de piel. Envío a todo Chile.",
};

const pilares = [
  { titulo: "Prevención", descripcion: "La filosofía K-Beauty prioriza mantener la piel sana antes que corregir el daño. La protección solar y la hidratación diaria son la base." },
  { titulo: "Hidratación profunda", descripcion: "Múltiples capas de hidratación en texturas ligeras que se absorben sin sensación grasa, construyendo una barrera cutánea sólida." },
  { titulo: "Ingredientes activos", descripcion: "Uso de activos biocompatibles y de origen natural como centella, snail mucin, ceramidas y extractos vegetales con respaldo científico." },
  { titulo: "Consistencia", descripcion: "Una rutina sencilla y constante produce mejores resultados que tratamientos intensivos esporádicos. El cuidado diario es la clave." },
];

const categorias = [
  { nombre: "Protección Solar", descripcion: "SPF50+ con texturas ligeras y acabado invisible. El paso más importante de cualquier rutina.", href: "/proteccion-solar" },
  { nombre: "Hidratantes", descripcion: "Cremas, geles y emulsiones con ingredientes activos para cada tipo de piel.", href: "/hidratantes" },
  { nombre: "Sérums y esencias", descripcion: "Activos concentrados para objetivos específicos: manchas, textura, poros o luminosidad.", href: "/productos" },
  { nombre: "Limpiadores", descripcion: "Limpieza efectiva sin agredir la barrera cutánea. Aceites, espumas y micelares.", href: "/productos" },
];

const faqs = [
  {
    pregunta: "¿Qué es la dermocosmética coreana?",
    respuesta:
      "Es una rama de la cosmética que combina ingredientes activos con eficacia clínica demostrada en texturas y fórmulas desarrolladas por la industria coreana. Se diferencia de la cosmética convencional por su énfasis en la salud de la barrera cutánea, ingredientes biocompatibles y prevención del envejecimiento.",
  },
  {
    pregunta: "¿En qué se diferencia del skincare occidental?",
    respuesta:
      "El skincare coreano tiende a ser más preventivo, a usar más capas ligeras en lugar de una sola crema densa, y a incorporar ingredientes innovadores (mucina de caracol, extracto de arroz fermentado, centella) antes de que lleguen a occidente. También suele tener mejor relación calidad-precio en muchos activos clave.",
  },
  {
    pregunta: "¿Tengo que seguir una rutina de 10 pasos?",
    respuesta:
      "No. La rutina de 10 pasos es una guía de máximos, no una obligación. Lo esencial son 3 pasos: limpiar, hidratar y proteger. Podés agregar pasos adicionales según tus necesidades específicas, al ritmo que quieras.",
  },
  {
    pregunta: "¿Son seguros estos productos para pieles sensibles?",
    respuesta:
      "Sí, muchos productos K-Beauty están especialmente formulados para pieles sensibles, reactivas o con condiciones como rosácea o dermatitis. En Beauty Lab seleccionamos productos con criterio médico, priorizando ingredientes tolerables y eficaces.",
  },
  {
    pregunta: "¿Cómo sé qué productos necesito?",
    respuesta:
      "Una asesoría SkinCoach con la Dra. Solange te permite hacer un diagnóstico de tu piel y diseñar una rutina personalizada con los productos exactos que necesitás, sin comprar de más.",
  },
];

export default function DermocosmeticaCoreanaPage() {
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
              <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#C9A96E] uppercase">Dermocosmética Coreana</span>
            </nav>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-3">K-Beauty Premium</span>
                <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[1.1] text-[#FAF8F5] lg:text-6xl">
                  Dermocosmética
                  <br />
                  <em className="text-[#E8C9C1]">coreana</em>
                </h1>
              </div>
              <p className="max-w-sm font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#E8C9C1]/70">
                Ciencia e innovación coreana al servicio de tu piel. Ingredientes activos, texturas únicas y resultados visibles con criterio médico.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
              {[
                { value: "Activos", label: "Ingredientes clínicos" },
                { value: "Criterio", label: "Selección médica" },
                { value: "Todos", label: "Tipos de piel" },
                { value: "Chile", label: "Envío a todo el país" },
              ].map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#C9A96E]">{s.value}</span>
                  <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#E8C9C1]/60">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filosofía */}
        <section className="bg-[#FAF8F5] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-14 text-center">
              <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">Filosofía</span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] lg:text-5xl">
                Los 4 pilares del
                <br />
                <em className="text-[#5C3A48]">K-Beauty</em>
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {pilares.map((p, i) => (
                <div key={p.titulo} className="flex gap-6 rounded-3xl border border-[#E8C9C1]/60 bg-white p-8">
                  <span className="flex-shrink-0 font-[family-name:var(--font-cormorant)] text-5xl font-light text-[#D4A5A0]">0{i + 1}</span>
                  <div>
                    <div className="mb-3 h-px w-8 bg-[#C9A96E]" />
                    <h3 className="mb-2 font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2C2329]">{p.titulo}</h3>
                    <p className="font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">{p.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categorías */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-14 text-center">
              <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">Categorías</span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] lg:text-5xl">
                Explorá nuestra
                <br />
                <em className="text-[#5C3A48]">selección</em>
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {categorias.map((cat) => (
                <Link key={cat.nombre} href={cat.href} className="group flex flex-col rounded-3xl border border-[#E8C9C1]/60 bg-[#FAF8F5] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(92,58,72,0.1)]">
                  <div className="mb-4 h-px w-8 bg-[#C9A96E]" />
                  <h3 className="mb-3 font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2C2329] group-hover:text-[#5C3A48] transition-colors">{cat.nombre}</h3>
                  <p className="mb-6 flex-1 font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">{cat.descripcion}</p>
                  <div className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-xs font-medium tracking-wider text-[#5C3A48] uppercase">
                    Ver más
                    <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </div>
                </Link>
              ))}
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
