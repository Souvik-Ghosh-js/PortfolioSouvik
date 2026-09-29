import { motion, useReducedMotion } from 'framer-motion';
import type { ComponentType, CSSProperties, ReactNode } from 'react';

type AnyMotion = ComponentType<Record<string, unknown>>;

const cache = new Map<string, AnyMotion>();

/** motion.create() for dynamic element types, cached so components keep their identity across renders. */
function motionFor(tag: string): AnyMotion {
  let m = cache.get(tag);
  if (!m) {
    m = motion.create(tag as keyof JSX.IntrinsicElements) as unknown as AnyMotion;
    cache.set(tag, m);
  }
  return m;
}

type FadeInProps = {
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
  'aria-label'?: string;
};

export function FadeIn({ as = 'div', delay = 0, duration = 0.7, x = 0, y = 30, children, ...rest }: FadeInProps) {
  const reduce = useReducedMotion();
  const M = motionFor(as);

  return (
    <M
      initial={reduce ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay: reduce ? 0 : delay, duration: reduce ? 0 : duration, ease: [0.25, 0.1, 0.25, 1] }}
      {...rest}
    >
      {children}
    </M>
  );
}
