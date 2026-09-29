import { useEffect, useRef, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
};

/** Mouse-following magnetic hover effect. Pointer-only; skipped for touch and reduced-motion users. */
export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}: MagnetProps) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let active = false;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = outer.current;
        const el = inner.current;
        if (!box || !el) return;
        const r = box.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const within = Math.abs(dx) < r.width / 2 + padding && Math.abs(dy) < r.height / 2 + padding;

        if (within) {
          if (!active) el.style.transition = activeTransition;
          active = true;
          el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
        } else if (active) {
          active = false;
          el.style.transition = inactiveTransition;
          el.style.transform = 'translate3d(0, 0, 0)';
        }
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
    };
  }, [padding, strength, activeTransition, inactiveTransition, reduce]);

  return (
    <div ref={outer} className={className}>
      <div ref={inner} style={{ willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}
