import { ArrowUp, Mail, MessageCircle, Phone } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { ContactButton, GhostButton } from '../components/Buttons';
import { site } from '../data/site';

export function ContactSection() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-ink px-5 pb-8 pt-20 sm:px-8 sm:pt-24 md:px-10 md:pt-32">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 text-center sm:gap-14">
        <FadeIn
          as="h2"
          y={40}
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Let&apos;s talk
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.1}
          className="max-w-[560px] font-light leading-relaxed text-frost"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        >
          Have a website, app or software idea? Tell me about it and I&apos;ll get back to you within a day.
        </FadeIn>

        <FadeIn delay={0.2} className="flex flex-col items-center gap-3 sm:gap-4">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-3 break-all font-medium text-frost transition-opacity duration-200 hover:opacity-70"
            style={{ fontSize: 'clamp(1.1rem, 3.2vw, 2.6rem)' }}
          >
            <Mail className="h-[0.9em] w-[0.9em] shrink-0" aria-hidden="true" />
            {site.email}
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-3 font-medium text-frost transition-opacity duration-200 hover:opacity-70"
            style={{ fontSize: 'clamp(1.1rem, 3.2vw, 2.6rem)' }}
          >
            <Phone className="h-[0.9em] w-[0.9em] shrink-0" aria-hidden="true" />
            {site.phone}
          </a>
        </FadeIn>

        <FadeIn delay={0.3} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <ContactButton href={`mailto:${site.email}`}>Email me</ContactButton>
          <GhostButton href={site.whatsapp} external={false}>
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </GhostButton>
        </FadeIn>
      </div>

      <div className="mx-auto mt-20 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-frost/15 pt-6 font-mono text-[11px] uppercase tracking-widest text-frost/60 sm:mt-28">
        <p>
          © {year} {site.name}
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-5">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors duration-200 hover:text-frost">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#top" className="inline-flex items-center gap-1 transition-colors duration-200 hover:text-frost">
          Back to top
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
