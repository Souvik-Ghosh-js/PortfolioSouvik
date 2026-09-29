import { useRef, type CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
};

/** Character-by-character scroll-driven reveal. Screen readers get the whole sentence via aria-label. */
export function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });

  if (reduce) {
    return (
      <p ref={ref} className={className} style={style}>
        {text}
      </p>
    );
  }

  const words = text.split(' ');
  const total = text.length;
  let cursor = 0;

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, wi) => {
        const start = cursor;
        cursor += word.length + 1;
        return (
          <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
            {word.split('').map((ch, ci) => {
              const at = ((start + ci) / total) * 0.85;
              return <Char key={ci} ch={ch} range={[at, at + 0.15]} progress={scrollYProgress} />;
            })}
            {wi < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </p>
  );
}

function Char({ ch, range, progress }: { ch: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="opacity-20">{ch}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {ch}
      </motion.span>
    </span>
  );
}
