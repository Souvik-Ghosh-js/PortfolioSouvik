# Souvik Ghosh — Portfolio

Single-page portfolio built with React 18, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide icons.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

## Make it yours

| What | Where |
|------|-------|
| Name, role, tagline, phone, email, stats, about text, services | `src/data/site.ts` |
| Live sites, demos, Play Store apps, featured project cards | `src/data/work.ts` |
| Hero photo | `public/potrait.jpeg`, shown in a rounded gradient-framed card. If the file is missing a gradient "SG" monogram card is shown. |
| Colours and fonts | `tailwind.config.js` (`ink`, `frost`) and `src/index.css` (`.hero-heading` gradient) |

### Screenshots

Work tiles load live screenshots from the free WordPress mShots service. The first time a URL is
requested it returns a placeholder while the screenshot is generated, so the first visit may show
grey tiles for a few seconds. For production, save your own screenshots into `public/work/` and set
`image: '/work/<file>.png'` on the item in `src/data/work.ts`.

### Play Store links

The two app entries in `src/data/work.ts` point at Play Store search results. Replace them with the
real listing URLs (`https://play.google.com/store/apps/details?id=...`).

## Design notes

Generated with the `ui-ux-pro-max` skill (installed in `.claude/skills/`). The persisted design
system lives in `design-system/souvik-ghosh-portfolio/MASTER.md`. Motion respects
`prefers-reduced-motion`, all interactive elements are keyboard focusable with visible focus rings,
and the marquee is scroll-driven rather than auto-playing.
