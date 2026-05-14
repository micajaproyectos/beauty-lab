import type { Metadata } from "next";
import Link from "next/link";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Hidratantes Coreanos — Skincare K-Beauty — Beauty Lab",
  description:
    "Cremas e hidratantes coreanos con ingredientes activos como ceramidas, centella asiática y ácido hialurónico. Selección con criterio médico. Envío a todo Chile.",
};

const ingredientes = [
  { nombre: "Ceramidas", descripcion: "Reparan y fortalecen la barrera cutánea, evitando la pérdida de agua transepidérmica. Esenciales para pieles sensibles y reactivas." },
  { nombre: "Ácido Hialurónico", descripcion: "Capta y retiene hasta 1000 veces su peso en agua. Proporciona hidratación profunda y efecto relleno visible desde la primera aplicación." },
  { nombre: "Centella Asiática", descripcion: "Calmante, cicatrizante y antiinflamatoria. Ideal para pieles sensibles, con rojeces o post-procedimiento médico estético." },
  { nombre: "Niacinamida", descripcion: "Regula el sebo, unifica el tono, minimiza poros y fortalece la barrera de la piel. Activo versátil para casi todo tipo de pieles." },
  { nombre: "Snail Mucin", descripcion: "Regenerador, hidratante y calmante. Estimula la producción de colágeno y acelera la recuperación de la piel irritada o dañada." },
  { nombre: "Beta-Glucano", descripcion: "Hidratación profunda con propiedades calmantes. Alternativa a la niacinamida para pieles muy sensibles. Suaviza sin irritar." },
];

const rutina = [
  { paso: "01", nombre: "Limpieza", descripcion: "Doble limpieza (aceite + espuma) para remover SPF, maquillaje e impurezas sin comprometer la barrera." },
  { paso: "02", nombre: "Tónico", descripcion: "Prepara la piel para absorber mejor los activos siguientes. Hidratación inicial de base acuosa." },
  { paso: "03", nombre: "Sérum o esencia", descripcion: "Activos concentrados para objetivos específicos: manchas, textura, luminosidad o hidratación profunda." },
  { paso: "04", nombre: "Hidratante", descripcion: "Sella la hidratación y los activos aplicados. Nutre y protege la barrera cutánea durante horas." },
  { paso: "05", nombre: "SPF (mañana)", descripcion: "Cierra la rutina matutina. Protección solar SPF50+ imprescindible para prevenir el envejecimiento prematuro." },
];

const faqs = [
  {
    pregunta: "¿Los hidratantes coreanos son mejores que los occidentales?",
    respuesta:
      "No necesariamente mejores, pero sí diferentes. La cosmética coreana tiene una larga tradición en texturas innovadoras, ingredientes naturales bioactivos y fórmulas orientadas a la prevención. Muchos productos ofrecen una relación calidad-precio excelente con ingredientes de alta eficacia.",
  },
  {
    pregunta: "¿Cómo elijo el hidratante correcto para mi tipo de piel?",
    respuesta:
      "Depende principalmente de tu tipo de piel y objetivos: piel seca necesita cremas más oclusivas con ceramidas; piel grasa se beneficia de geles oil-free o emulsiones ligeras; piel sensible busca ingredientes calmantes como centella o beta-glucano. Una asesoría SkinCoach puede ayudarte a elegir con precisión.",
  },
  {
    pregunta: "¿Hay que usar muchos pasos para que funcione?",
    respuesta:
      "No. La rutina mínima efectiva es limpieza + hidratante + SPF. Los pasos adicionales suman beneficios, pero una rutina simple y constante supera siempre a una rutina compleja abandonada.",
  },
  {
    pregunta: "¿Son seguros durante el embarazo o lactancia?",
    respuesta:
      "La mayoría sí, pero algunos activos como el retinol deben evitarse. Para una guía personalizada durante el embarazo o lactancia, consulta con nuestra SkinCoach.",
  },
];

export default function HidratantesPage() {
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
              <span className="font-[family-name:var(--font-inter)] text-xs font-light tracking-wider text-[#C9A96E] uppercase">Hidratantes</span>
            </nav>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-3">K-Beauty · Skincare</span>
                <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[1.1] text-[#FAF8F5] lg:text-6xl">
                  Hidratantes
                  <br />
                  <em className="text-[#E8C9C1]">coreanos</em>
                </h1>
              </div>
              <p className="max-w-sm font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#E8C9C1]/70">
                Cremas e hidratantes con ingredientes activos seleccionados con criterio médico. La base de cualquier rutina de skincare efectiva.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
              {[
                { value: "Ingredientes", label: "Selección médica" },
                { value: "Todos", label: "Tipos de piel" },
                { value: "Sin parabenos", label: "Fórmulas limpias" },
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

        {/* Ingredientes */}
        <section className="bg-[#FAF8F5] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-14 text-center">
              <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">Ingredientes clave</span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] lg:text-5xl">
                Lo que hace que
                <br />
                <em className="text-[#5C3A48]">funcionen</em>
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ingredientes.map((ing) => (
                <div key={ing.nombre} className="rounded-2xl border border-[#E8C9C1]/60 bg-white p-6">
                  <div className="mb-3 h-px w-8 bg-[#C9A96E]" />
                  <h3 className="mb-2 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#2C2329]">{ing.nombre}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm font-light leading-relaxed text-[#7A6A6E]">{ing.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rutina */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-14 text-center">
              <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-medium tracking-[0.3em] text-[#C9A96E] uppercase mb-4">Rutina</span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#2C2329] lg:text-5xl">
                El lugar del hidratante
                <br />
                <em className="text-[#5C3A48]">en tu rutina</em>
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {rutina.map((r) => (
                <div key={r.paso} className={`flex flex-col rounded-2xl border p-5 ${r.nombre === "Hidratante" ? "border-[#C9A96E] bg-[#FAF8F5] shadow-[0_8px_32px_rgba(201,169,110,0.15)]" : "border-[#E8C9C1]/60 bg-[#FAF8F5]"}`}>
                  <span className="mb-2 font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#D4A5A0]">{r.paso}</span>
                  <h3 className={`mb-2 font-[family-name:var(--font-cormorant)] text-lg font-medium ${r.nombre === "Hidratante" ? "text-[#5C3A48]" : "text-[#2C2329]"}`}>{r.nombre}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-xs font-light leading-relaxed text-[#7A6A6E]">{r.descripcion}</p>
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
