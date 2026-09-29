import { FadeIn } from '../components/FadeIn';
import { services } from '../data/site';

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative z-[1] rounded-t-[40px] bg-white px-5 py-20 text-ink sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn
        as="h2"
        y={40}
        className="mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Services
      </FadeIn>

      <ul className="mx-auto max-w-5xl border-t border-ink/15">
        {services.map((service, i) => (
          <FadeIn
            as="li"
            key={service.num}
            delay={i * 0.1}
            className="flex items-start gap-5 border-b border-ink/15 py-8 sm:gap-10 sm:py-10 md:py-12"
          >
            <span
              className="shrink-0 font-black leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              aria-hidden="true"
            >
              {service.num}
            </span>
            <div className="flex flex-col gap-2 pt-2 sm:gap-3 sm:pt-3 md:pt-4">
              <h3 className="font-medium uppercase leading-tight" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                {service.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
