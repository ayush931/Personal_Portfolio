import { SmoothScroll } from "@/components/common/SmoothScroll";
import { ScrollSection } from "@/components/common/ScrollSection";
import { Header } from "@/components/navigation/Header";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Work } from "@/components/work/Work";
import { Education } from "@/components/education/Education";
import { BlogsSection } from "@/components/blogs/BlogsSection";
import { Skills } from "@/components/skills/Skills";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";
import { VisitorTracker } from "@/components/common/VisitorTracker";

export default function Home() {
  return (
    <SmoothScroll>
      <VisitorTracker />
      <Header />
      <main className="min-h-svh w-full relative">
        <ScrollSection id="hero">
          <Hero />
        </ScrollSection>
        <ScrollSection id="about">
          <About />
        </ScrollSection>
        <ScrollSection id="work">
          <Work />
        </ScrollSection>
        <ScrollSection id="education">
          <Education />
        </ScrollSection>
        <ScrollSection id="blogs">
          <BlogsSection />
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
