import { useRef, useState, type CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { GhostButton } from '../components/Buttons';
import { WorkTile } from '../components/WorkTile';
import { apps, demos, featured, liveSites, type FeaturedProject } from '../data/work';

export function ProjectsSection() {
  const container = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });

  return (
    <section
      id="work"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-ink px-5 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
    >
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading text-center font-black uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Projects
      </FadeIn>

      <div ref={container} className="mx-auto mt-16 max-w-6xl sm:mt-20 md:mt-28">
        {featured.map((project, i) => (
          <ProjectCard
            key={project.num}
            project={project}
            index={i}
            total={featured.length}
            progress={scrollYProgress}
            reduce={!!reduce}
          />
        ))}
      </div>

      <WorkGrid />
    </section>
  );
}

type CardProps = {
  project: FeaturedProject;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
};

function ProjectCard({ project, index, total, progress, reduce }: CardProps) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const [top, left, right] = project.images;

  return (
    <div className="stack-card sticky h-[85vh]" style={{ top: `calc(var(--stick) + ${index * 28}px)` }}>
      <motion.article
        style={{ scale: reduce ? 1 : scale, transformOrigin: 'top center' }}
        className="relative rounded-[40px] border-2 border-frost bg-ink p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6">
          <div className="flex items-end gap-4 sm:gap-6">
            <span
              className="hero-heading font-black leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 110px)' }}
              aria-hidden="true"
            >
              {project.num}
            </span>
            <div className="pb-1 sm:pb-2">
              <p className="font-mono text-[11px] uppercase tracking-widest text-frost/60 sm:text-xs">
                {project.category}
              </p>
              <h3 className="font-medium uppercase leading-tight" style={{ fontSize: 'clamp(1.1rem, 2.4vw, 2.1rem)' }}>
                {project.title}
              </h3>
            </div>
          </div>
          <GhostButton href={project.href}>{project.cta}</GhostButton>
        </div>

        <div className="mt-5 grid grid-cols-[2fr_3fr] gap-3 sm:mt-8 sm:gap-4 md:gap-5">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
            <CardImage {...top} style={{ height: 'clamp(120px, 13vw, 200px)' }} />
            <CardImage {...left} style={{ height: 'clamp(150px, 18vw, 280px)' }} />
          </div>
          <CardImage {...right} className="h-full" />
        </div>
      </motion.article>
    </div>
  );
}

function CardImage({ src, alt, className = '', style }: { src: string; alt: string; className?: string; style?: CSSProperties }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`w-full overflow-hidden rounded-[28px] bg-[#151515] ring-1 ring-white/10 sm:rounded-[40px] md:rounded-[52px] ${className}`}
      style={style}
    >
      {failed ? (
        <div className="flex h-full w-full items-end bg-[radial-gradient(120%_120%_at_0%_0%,#2a2a2a_0%,#0c0c0c_70%)] p-5">
          <span className="hero-heading text-2xl font-black uppercase leading-none tracking-tight">{alt}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
        />
      )}
    </div>
  );
}

function WorkGrid() {
  const all = [...liveSites, ...apps, ...demos];
  return (
    <div className="mx-auto max-w-6xl pb-24 pt-16 sm:pt-20 md:pb-32">
      <FadeIn className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
        <h3 className="font-medium uppercase tracking-wide" style={{ fontSize: 'clamp(1.25rem, 2.4vw, 2rem)' }}>
          All work
        </h3>
        <p className="font-mono text-xs uppercase tracking-widest text-frost/60">
          {liveSites.length} live sites · {demos.length} demos · {apps.length} apps
        </p>
      </FadeIn>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {all.map((item, i) => (
          <FadeIn as="li" key={item.url} delay={(i % 3) * 0.08}>
            <WorkTile item={item} className="aspect-[16/10]" />
          </FadeIn>
        ))}
      </ul>
    </div>
  );
}
