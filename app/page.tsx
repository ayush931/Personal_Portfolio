import { SmoothScroll } from "@/components/common/SmoothScroll";
import { ScrollSection } from "@/components/common/ScrollSection";
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
      <main className="min-h-svh w-full overflow-y-auto scroll-smooth">
        <ScrollSection id="hero">
          <Hero />
        </ScrollSection>
        <ScrollSection id="about">
          <About />
        </ScrollSection>
        <ScrollSection id="work">
          <Work />
        </ScrollSection>
        <ScrollSection id="craft">
          <Craft />
        </ScrollSection>
        <ScrollSection id="skills">
          <Skills />
        </ScrollSection>
        <ScrollSection id="contact">
          <Contact />
        </ScrollSection>
        <ScrollSection id="footer" as="footer" minHeight={false}>
          <Footer />
        </ScrollSection>
      </main>
    </SmoothScroll>
  );
}
