import { useLayoutEffect, useRef } from 'react';

/**
 * Scales a single-line, inline-block element's font-size so its text fills the parent width.
 * `fill` is the fraction of the parent width to occupy (1 = edge to edge).
 */
export function useFitText<T extends HTMLElement>(fill = 1, max = 2000) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const fit = () => {
      el.style.fontSize = '100px';
      const textWidth = el.scrollWidth || 1;
      const cs = getComputedStyle(parent);
      const contentWidth = parent.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const size = Math.min(max, (contentWidth * fill * 100) / textWidth);
      el.style.fontSize = `${size}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    document.fonts?.ready.then(fit).catch(() => undefined);
    return () => ro.disconnect();
  }, [fill, max]);

  return ref;
}
