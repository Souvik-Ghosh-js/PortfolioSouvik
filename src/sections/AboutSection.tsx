import { Code2, Database, Globe, Smartphone, type LucideIcon } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { ContactButton } from '../components/Buttons';
import { site } from '../data/site';

type Corner = { Icon: LucideIcon; position: string; size: string; x: number; delay: number; float: number };

const corners: Corner[] = [
  {
    Icon: Code2,
    position: 'left-[1%] top-[4%] sm:left-[2%] md:left-[4%]',
    size: 'h-[80px] w-[80px] sm:h-[110px] sm:w-[110px] md:h-[140px] md:w-[140px]',
    x: -80,
    delay: 0.1,
    float: 0,
  },
  {
    Icon: Database,
    position: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]',
    size: 'h-[68px] w-[68px] sm:h-[96px] sm:w-[96px] md:h-[120px] md:w-[120px]',
    x: -80,
    delay: 0.25,
    float: 1.5,
  },
  {
    Icon: Smartphone,
    position: 'right-[1%] top-[4%] sm:right-[2%] md:right-[4%]',
    size: 'h-[80px] w-[80px] sm:h-[110px] sm:w-[110px] md:h-[140px] md:w-[140px]',
    x: 80,
    delay: 0.15,
    float: 0.8,
  },
  {
    Icon: Globe,
    position: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]',
    size: 'h-[86px] w-[86px] sm:h-[116px] sm:w-[116px] md:h-[150px] md:w-[150px]',
    x: 80,
    delay: 0.3,
    float: 2.2,
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-20 sm:px-8 md:px-10"
    >
      {corners.map(({ Icon, position, size, x, delay, float }, i) => (
        <div key={i} className={`absolute ${position}`} aria-hidden="true">
          <FadeIn delay={delay} x={x} y={0} duration={0.9}>
            <div
              className={`float-tile flex items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur ${size}`}
              style={{ animationDelay: `${float}s` }}
            >
              <Icon className="h-[42%] w-[42%] text-frost" strokeWidth={1.25} />
            </div>
          </FadeIn>
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn
          as="h2"
          y={40}
          className="hero-heading text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          About me
        </FadeIn>

        <AnimatedText
          text={site.about}
          className="max-w-[560px] text-center font-medium leading-relaxed text-frost"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />

        <FadeIn as="dl" delay={0.1} className="grid w-full max-w-4xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {site.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse items-center text-center">
              <dt className="mt-1 font-mono text-[11px] uppercase tracking-widest text-frost/60 sm:text-xs">
                {stat.label}
              </dt>
              <dd
                className="hero-heading font-black leading-none tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </FadeIn>

        <FadeIn delay={0.2} className="mt-6 sm:mt-8">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
