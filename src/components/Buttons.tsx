import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

type ButtonProps = {
  href?: string;
  children?: ReactNode;
  className?: string;
  external?: boolean;
};

/** Gradient pill call-to-action. */
export function ContactButton({ href = '#contact', children = 'Contact Me', className = '', external }: ButtonProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid #ffffff',
        outlineOffset: '-3px',
      }}
    >
      {children}
    </a>
  );
}

/** Outline pill button used for "Live Project" style links. */
export function GhostButton({ href = '#', children, className = '', external = true }: ButtonProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`inline-flex items-center gap-2 rounded-full border-2 border-frost px-8 py-3 text-sm font-medium uppercase tracking-widest text-frost transition-colors duration-200 hover:bg-frost/10 sm:px-10 sm:py-3.5 sm:text-base ${className}`}
    >
      {children}
      {external && <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
    </a>
  );
}
