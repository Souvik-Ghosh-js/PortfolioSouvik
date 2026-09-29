import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ContactSection } from './sections/ContactSection';

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-ink text-frost" style={{ overflowX: 'clip' }}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <HeroSection />
      <main id="main">
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
      </main>
      <ContactSection />
    </div>
  );
}
