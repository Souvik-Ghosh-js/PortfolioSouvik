// Captures desktop + phone screenshots of every project site into public/work/:
//   <slug>.jpg         1440x900 desktop
//   <slug>-mobile.jpg  390x844 phone (only for MOBILE_SLUGS — the sites with an app)
// Usage: npm run shots               (all sites)
//        npm run shots -- pizzahap   (only slugs containing "pizzahap")
// The slug rule must match `slugOf` in src/data/work.ts.
import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'work');

// Pull every URL out of the data file (Play Store links are skipped).
const source = readFileSync(path.join(root, 'src', 'data', 'work.ts'), 'utf8');
const urls = [...new Set([...source.matchAll(/url: '([^']+)'/g)].map((m) => m[1]))].filter(
  (u) => !u.includes('play.google.com'),
);

const slugOf = (url) =>
  new URL(url).hostname
    .replace(/^www\./, '')
    .replace(/\.(netlify\.app|com|in|org\.in|org|gobt\.in)$/, '')
    .replace(/\./g, '-');

const MOBILE_SLUGS = ['gharkamali', 'pizzahap'];

const filter = process.argv[2];
const targets = filter ? urls.filter((u) => slugOf(u).includes(filter)) : urls;

/** Closes promo popups / language pickers so the real page is visible. */
async function dismissOverlays(page) {
  const tryClick = async (selector) => {
    const el = page.locator(selector).first();
    if (await el.isVisible().catch(() => false)) {
      await el.click({ timeout: 2000 }).catch(() => {});
      return true;
    }
    return false;
  };

  // Language pickers: pick English.
  if (await tryClick('button:has-text("English"), a:has-text("English")')) await page.waitForTimeout(2500);

  // Close buttons on modals.
  const closers = [
    '[role="dialog"] [aria-label*="close" i]',
    '[aria-modal="true"] [aria-label*="close" i]',
    'button[aria-label*="close" i]',
    'button[aria-label*="dismiss" i]',
    '[class*="modal" i] [class*="close" i]',
    '[class*="popup" i] [class*="close" i]',
    'button:text-is("×")',
    'button:text-is("✕")',
    'button:text-is("x")',
  ];
  for (const sel of closers) {
    if (await tryClick(sel)) break;
  }
  await page.keyboard.press('Escape').catch(() => {});
  await page.waitForTimeout(1500);
}

async function capture(context, url, file) {
  const page = await context.newPage();
  try {
    const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() =>
      // Some sites never go idle (analytics, sockets) — fall back to "loaded".
      page.goto(url, { waitUntil: 'load', timeout: 45000 }),
    );
    if (res && res.status() >= 400) throw new Error(`HTTP ${res.status()} (site blocked or down) — add a screenshot by hand`);
    // Let entrance animations, lazy images and preloaders finish.
    await page.waitForTimeout(4000);
    await dismissOverlays(page);
    await page.screenshot({ path: file, type: 'jpeg', quality: 80 });
    console.log(`ok    ${url}  ->  public/work/${path.basename(file)}`);
    return true;
  } catch (err) {
    console.log(`FAIL  ${url}  ${err.message.split('\n')[0]}`);
    return false;
  } finally {
    await page.close();
  }
}

await mkdir(outDir, { recursive: true });
// Prefer the locally installed Chrome so `npx playwright install` isn't required.
const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch());

const variants = [
  { suffix: '', options: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 } },
  // Phone shots are only used by the Play Store app tiles.
  { suffix: '-mobile', options: { ...devices['iPhone 13'], deviceScaleFactor: 2 }, only: MOBILE_SLUGS },
];

let failures = 0;
for (const { suffix, options, only } of variants) {
  const context = await browser.newContext({ ...options, ignoreHTTPSErrors: true });
  for (const url of targets) {
    if (only && !only.includes(slugOf(url))) continue;
    const ok = await capture(context, url, path.join(outDir, `${slugOf(url)}${suffix}.jpg`));
    if (!ok) failures++;
  }
  await context.close();
}

await browser.close();
if (failures) process.exitCode = 1;
