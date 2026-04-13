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
      </main>
      <Footer />
    </>
  );
}
