import { useState } from 'react';
import { site } from '../data/site';

const GRADIENT = 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)';

/**
 * Hero portrait: public/potrait.jpeg shown inside a rounded, gradient-framed card.
 * Falls back to a gradient "SG" monogram card if the photo is missing.
 */
export function HeroVisual() {
  const [hasPhoto, setHasPhoto] = useState(true);
  const src = `${import.meta.env.BASE_URL}potrait.jpeg`;

  return (
    <div
      className="relative mx-auto w-[min(300px,40vh)] rounded-[40px] p-[3px] sm:w-[min(320px,44vh)] sm:rounded-[50px] md:w-[min(380px,46vh)] lg:w-[min(420px,47vh)] lg:rounded-[60px]"
      style={{
        background: GRADIENT,
        boxShadow: '0 40px 80px rgba(118, 33, 176, 0.35), 0 0 0 1px rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-[37px] bg-ink sm:rounded-[47px] lg:rounded-[57px]"
        style={{ containerType: 'inline-size' }}
      >
        {hasPhoto ? (
          <img
            src={src}
            alt={`${site.name}, ${site.role}`}
            width={1086}
            height={1280}
            onError={() => setHasPhoto(false)}
            className="h-full w-full object-cover object-top"
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0" style={{ background: GRADIENT }} role="img" aria-label={`${site.name} monogram`}>
            <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.22),transparent_70%)]" />
            <span
              className="absolute inset-0 flex items-center justify-center font-black uppercase leading-none tracking-tight text-white"
              style={{ fontSize: '42cqw' }}
            >
              SG
            </span>
          </div>
        )}

        {/* Legibility gradient for the bottom labels */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white backdrop-blur sm:left-6 sm:top-6">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" aria-hidden="true" />
          Open to projects
        </div>

        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-white/90 sm:text-[11px] sm:inset-x-6 sm:bottom-6">
          <span>{site.role}</span>
          <span>15+ clients</span>
        </div>
      </div>
    </div>
  );
}
