import { SmoothScroll } from "@/components/common/SmoothScroll";
import { Header } from "@/components/navigation/Header";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Work } from "@/components/work/Work";
import { Craft } from "@/components/craft/Craft";
import { Skills } from "@/components/skills/Skills";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <Craft />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
