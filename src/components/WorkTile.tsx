import { useState } from 'react';
import { ArrowUpRight, Smartphone } from 'lucide-react';
import { hostOf, screenshot, type WorkItem } from '../data/work';

type WorkTileProps = {
  item: WorkItem;
  className?: string;
  /** Decorative copies (marquee) are hidden from assistive tech and not focusable. */
  decorative?: boolean;
};

export function WorkTile({ item, className = '', decorative = false }: WorkTileProps) {
  const [failed, setFailed] = useState(false);
  const host = hostOf(item.url);
  const isApp = item.kind === 'app';
  const src = item.image ?? (isApp ? null : screenshot(item.url));

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      aria-label={decorative ? undefined : `${item.name}, ${item.tag} (opens in a new tab)`}
      aria-hidden={decorative || undefined}
      tabIndex={decorative ? -1 : undefined}
      className={`group relative block overflow-hidden rounded-2xl bg-[#151515] ring-1 ring-white/10 ${className}`}
    >
      {src && !failed ? (
        isApp ? (
          // Phone screenshot: show it whole, centred on a dark backdrop.
          <div className="flex h-full w-full items-start justify-center bg-[radial-gradient(120%_120%_at_50%_0%,#2a2a2a_0%,#0c0c0c_70%)] px-6 pt-5">
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              width={390}
              height={844}
              onError={() => setFailed(true)}
              className="w-[38%] rounded-xl ring-1 ring-white/15 transition-transform duration-500 ease-out group-hover:-translate-y-2"
            />
          </div>
        ) : (
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            width={1440}
            height={900}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        )
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(120%_120%_at_0%_0%,#2a2a2a_0%,#0c0c0c_70%)] p-5 pb-16 text-center">
          {isApp && <Smartphone className="h-8 w-8 text-frost/70" aria-hidden="true" />}
          <span className="hero-heading text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl">
            {item.name}
          </span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 pb-3 pt-10">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium uppercase tracking-wide text-white">{item.name}</p>
          <p className="truncate font-mono text-[11px] uppercase tracking-wider text-white/60">
            {isApp ? 'Google Play' : host} · {item.tag}
          </p>
        </div>
        <ArrowUpRight
          className="h-5 w-5 shrink-0 text-white/80 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </a>
  );
}
