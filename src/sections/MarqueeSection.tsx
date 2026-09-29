import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { WorkTile } from '../components/WorkTile';
import { demos, liveSites } from '../data/work';

const rows = [liveSites, demos];

/** Two rows of work screenshots that slide horizontally with the page scroll. Purely decorative. */
export function MarqueeSection() {
  const section = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = section.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      const shift = offset - 200;
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const x = i % 2 === 0 ? shift : -shift;
        row.style.transform = `translate3d(calc(-33.333% + ${x}px), 0, 0)`;
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduce]);

  return (
    <section ref={section} aria-hidden="true" className="overflow-hidden bg-ink pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        {rows.map((items, r) => (
          <div
            key={r}
            ref={(node) => {
              rowRefs.current[r] = node;
            }}
            className="flex w-max gap-3"
            style={{ willChange: 'transform', transform: 'translate3d(-33.333%, 0, 0)' }}
          >
            {[...items, ...items, ...items].map((item, i) => (
              <WorkTile
                key={`${item.url}-${i}`}
                item={item}
                decorative
                className="h-[180px] w-[280px] shrink-0 sm:h-[220px] sm:w-[340px] md:h-[270px] md:w-[420px]"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
