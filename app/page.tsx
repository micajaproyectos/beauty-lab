import Image from "next/image";
import HeroServer from "./components/HeroServer";
import NavCards from "./components/NavCards";
import Nosotras from "./components/Nosotras";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <HeroServer />
        <NavCards />
        <Nosotras />

        <CTA />

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
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="relative overflow-hidden rounded-3xl shadow-[0_16px_48px_rgba(92,58,72,0.12)]">
                <Image
                  src="/edificio.webp"
                  alt="Beauty Lab — Av. El Bosque Nte. 0226, Las Condes, Santiago"
                  width={1000}
                  height={875}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-3xl shadow-[0_16px_48px_rgba(92,58,72,0.12)]">
                <iframe
                  src="https://maps.google.com/maps?q=Av.+El+Bosque+Norte+0226,+Las+Condes,+Santiago,+Chile&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "420px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Beauty Lab — Av. El Bosque Nte. 0226, Las Condes, Santiago"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
