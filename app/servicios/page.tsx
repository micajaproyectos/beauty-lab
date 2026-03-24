import type { Metadata } from "next";
import ServiciosHero from "../components/ServiciosHero";
import Services from "../components/Services";
import Benefits from "../components/Benefits";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Tratamientos — Beauty Lab",
  description:
    "Toxina botulínica, ácido hialurónico, bioestimulación, hilos tensores y más. Agenda tu consulta personalizada.",
};

export default function ServicesPage() {
  return (
    <>
      <main>
        <ServiciosHero />
        <Services />
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
