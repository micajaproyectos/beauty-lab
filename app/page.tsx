import Hero from "./components/Hero";
import NavCards from "./components/NavCards";
import Nosotras from "./components/Nosotras";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <NavCards />
        <Nosotras />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
