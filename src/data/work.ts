export type WorkKind = 'site' | 'demo' | 'app';

export type WorkItem = {
  name: string;
  url: string;
  kind: WorkKind;
  tag: string;
  /** Optional image override. Defaults to the captured screenshot in public/work/. */
  image?: string;
};

/** File name used for a site's screenshot in public/work/. Must match `slugOf` in scripts/capture-screenshots.mjs. */
export function slugOf(url: string) {
  return new URL(url).hostname
    .replace(/^www\./, '')
    .replace(/\.(netlify\.app|com|in|org\.in|org|gobt\.in)$/, '')
    .replace(/\./g, '-');
}

/**
 * Local screenshot captured by `npm run shots` (saved in public/work/).
 * `mobile` points at the phone-sized capture.
 */
export function screenshot(url: string, { mobile = false }: { mobile?: boolean } = {}) {
  return `/work/${slugOf(url)}${mobile ? '-mobile' : ''}.jpg`;
}

export function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export const liveSites: WorkItem[] = [
  { name: 'Ghar Ka Mali', url: 'https://gharkamali.com', kind: 'site', tag: 'Website + App' },
  { name: 'PizzaHap', url: 'https://pizzahap.com', kind: 'site', tag: 'Website + App' },
  { name: 'GOBT x TATA', url: 'https://gobtxtata.gobt.in', kind: 'site', tag: 'Website' },
  { name: 'Oasis Elevators', url: 'https://oasiselevators.in', kind: 'site', tag: 'Website' },
  { name: 'AE India', url: 'https://aeindia.org.in', kind: 'site', tag: 'Website' },
  { name: 'Navaru', url: 'https://navaru.in', kind: 'site', tag: 'Website' },
  { name: 'Idea Shapers', url: 'https://ideashapers.org', kind: 'site', tag: 'Website' },
  { name: 'Mohini Print Shop', url: 'https://mohiniprintshop.org', kind: 'site', tag: 'Website' },
  { name: 'Voices From The Periphery', url: 'https://voicesfromtheperiphery.com', kind: 'site', tag: 'Website' },
  { name: 'D Pauls E-commerce', url: 'https://dpaulsecommerce.in', kind: 'site', tag: 'E-commerce' },
  { name: 'Computer Zone Bengal', url: 'https://computerzonebengal.com', kind: 'site', tag: 'Website' },
  {
    name: 'Assam Kaziranga National Park',
    url: 'https://assamkaziranganationalpark.com',
    kind: 'site',
    tag: 'Website',
  },
];

export const demos: WorkItem[] = [
  { name: 'Vet College GOBT', url: 'https://vetcollegegobt.netlify.app/', kind: 'demo', tag: 'Demo' },
  { name: 'Amit Tech Pro', url: 'https://amittechpro.netlify.app/', kind: 'demo', tag: 'Demo' },
  { name: 'JSS Jewel', url: 'https://jssjewel.netlify.app/', kind: 'demo', tag: 'Demo' },
  { name: 'Mastermind Abacus', url: 'https://mastermindabacus-demo.netlify.app/', kind: 'demo', tag: 'Demo' },
  { name: 'Golden Moment', url: 'https://goldenmoment.netlify.app/', kind: 'demo', tag: 'Demo' },
  { name: 'Gym App ERP', url: 'https://gymapperp.netlify.app/', kind: 'demo', tag: 'ERP demo' },
  { name: 'GOBT CRM', url: 'https://gobt-crm.netlify.app/', kind: 'demo', tag: 'CRM demo' },
  { name: 'Jewel App', url: 'https://jwellapp.netlify.app/', kind: 'demo', tag: 'App demo' },
];

/** TODO: replace the Play Store search URLs with the real listing URLs. */
export const apps: WorkItem[] = [
  {
    name: 'GharKaMali',
    url: 'https://play.google.com/store/search?q=GharKaMali&c=apps',
    image: screenshot('https://gharkamali.com', { mobile: true }),
    kind: 'app',
    tag: 'Android app',
  },
  {
    name: 'PizzaHap',
    url: 'https://play.google.com/store/search?q=PizzaHap&c=apps',
    image: screenshot('https://pizzahap.com', { mobile: true }),
    kind: 'app',
    tag: 'Android app',
  },
];

export type FeaturedProject = {
  num: string;
  category: string;
  title: string;
  href: string;
  cta: string;
  /** `fit: 'contain'` shows the whole image (used for phone screenshots). */
  images: { src: string; alt: string; fit?: 'cover' | 'contain' }[];
};

export const featured: FeaturedProject[] = [
  {
    num: '01',
    category: 'Client · Websites',
    title: 'Business Websites',
    href: 'https://gharkamali.com',
    cta: 'Live Site',
    images: [
      { src: screenshot('https://gharkamali.com'), alt: 'Ghar Ka Mali website' },
      { src: screenshot('https://oasiselevators.in'), alt: 'Oasis Elevators website' },
      { src: screenshot('https://assamkaziranganationalpark.com'), alt: 'Assam Kaziranga National Park website' },
    ],
  },
  {
    num: '02',
    category: 'Client · Software',
    title: 'CRM & ERP Systems',
    href: 'https://gobt-crm.netlify.app/',
    cta: 'Live Demo',
    images: [
      { src: screenshot('https://gobt-crm.netlify.app/'), alt: 'GOBT CRM dashboard' },
      { src: screenshot('https://gymapperp.netlify.app/'), alt: 'Gym App ERP' },
      { src: screenshot('https://jwellapp.netlify.app/'), alt: 'Jewel App software' },
    ],
  },
  {
    num: '03',
    category: 'Play Store · Android',
    title: 'Mobile Apps',
    href: apps[0].url,
    cta: 'Play Store',
    images: [
      { src: screenshot('https://gharkamali.com'), alt: 'GharKaMali' },
      { src: screenshot('https://pizzahap.com'), alt: 'PizzaHap' },
      {
        src: screenshot('https://gharkamali.com', { mobile: true }),
        alt: 'GharKaMali on a phone',
        fit: 'contain',
      },
    ],
  },
  {
    num: '04',
    category: 'Demos · Prototypes',
    title: 'Concept Builds',
    href: demos[0].url,
    cta: 'Live Demo',
    images: [
      { src: screenshot('https://vetcollegegobt.netlify.app/'), alt: 'Vet College GOBT demo' },
      { src: screenshot('https://jssjewel.netlify.app/'), alt: 'JSS Jewel demo' },
      { src: screenshot('https://goldenmoment.netlify.app/'), alt: 'Golden Moment demo' },
    ],
  },
];
