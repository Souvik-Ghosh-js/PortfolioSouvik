import { FadeIn } from '../components/FadeIn';
import { Magnet } from '../components/Magnet';
import { ContactButton } from '../components/Buttons';
import { HeroVisual } from '../components/HeroVisual';
import { useFitText } from '../hooks/useFitText';
import { site } from '../data/site';

export function HeroSection() {
  const headingRef = useFitText<HTMLHeadingElement>(1);

  return (
    <header className="relative flex h-svh min-h-[560px] flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn as="nav" delay={0} y={-20} className="relative z-20 px-6 pt-6 md:px-10 md:pt-8" aria-label="Primary">
        <ul className="flex items-center justify-between">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium uppercase tracking-wider text-frost transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeIn delay={0.15} y={40} className="mt-6 overflow-hidden px-6 sm:mt-4 md:-mt-5 md:px-10">
        <h1
          ref={headingRef}
          className="hero-heading inline-block whitespace-nowrap font-black uppercase leading-none tracking-tight"
        >
          Hi, I&apos;m {site.firstName}
        </h1>
      </FadeIn>

      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:translate-y-0">
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3}>
            <HeroVisual />
          </Magnet>
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between gap-4 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn
          as="p"
          delay={0.35}
          y={20}
          className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-frost sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
        >
          {site.tagline}
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </header>
  );
}
