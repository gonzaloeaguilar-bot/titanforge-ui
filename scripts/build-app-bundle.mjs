import { execFile } from 'node:child_process';
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const root = process.cwd();
const files = [
  'components.jsx',
  'page-home.jsx',
  'page-start.jsx',
  'page-train.jsx',
  'page-more.jsx',
  'app.jsx',
];
const publicAssetFiles = [
  'images/kris-hero.jpg',
  'images/two-ways-gym.jpg',
  'images/two-ways-online.jpg',
  'images/starting-recomp.jpg',
  'images/starting-strength.jpg',
  'images/starting-over40.jpg',
  'images/starting-recomp-split.jpg',
  'images/starting-strength-split.jpg',
  'images/starting-over40-split.jpg',
];

const chunks = [];
const snapshot = JSON.parse(await readFile(join(root, 'app/lib/googleReviewsSnapshot.json'), 'utf8'));
const reviewsData = JSON.parse(await readFile(join(root, 'data/google-reviews.json'), 'utf8'));
const clientResultsData = JSON.parse(await readFile(join(root, 'data/client-results.json'), 'utf8'));
const { staticFaqsForRoute } = await import('../app/lib/staticRouteContent.mjs');
chunks.push(`const HOME_REVIEWS=${JSON.stringify(snapshot)}; const HOME_GOOGLE_REVIEWS=${JSON.stringify(reviewsData)}; const HOME_FAQS=${JSON.stringify(staticFaqsForRoute('/'))}; const TITAN_CLIENT_RESULTS=${JSON.stringify(clientResultsData)};`);

// Vendored rail-kit components
const stripExports = (src) => {
  return src
    .replace(/"use client";/g, '')
    .replace(/^import\s+type\s+[^;]+;/gm, '')
    .replace(/^import\s+[^;]+from\s+['"][^'"]+['"];/gm, '')
    .replace(/^export\s+default\s+function\s+([A-Za-z0-9_]+)/gm, (m, p) => 'function ' + p)
    .replace(/^export\s+function\s+([A-Za-z0-9_]+)/gm, (m, p) => 'function ' + p)
    .replace(/^export\s+const\s+([A-Za-z0-9_]+)/gm, (m, p) => 'const ' + p)
    .replace(/^export\s+(?:type|interface)\s+/gm, 'type ');
};

const railFiles = [
  'icons.tsx',
  'RailPrice.tsx',
  'RailCard.tsx',
  'Rail.tsx',
  'RailByline.tsx',
  'RailRating.tsx',
  'RailPlans.tsx',
  'RailPlace.tsx',
  'RailFaq.tsx',
  'RailCta.tsx',
  'RailStickyBar.tsx',
  'RailScrub.tsx',
  'RailSteps.tsx'
  ,'RailOption.tsx'
  ,'RailVersus.tsx'
];

chunks.push('const { useSyncExternalStore } = React;\n');
for (const file of railFiles) {
  const code = await readFile(join(root, 'vendor/rail-kit', file), 'utf8');
  chunks.push(`\n/* ---- vendor/rail-kit/${file} ---- */\n`);
  chunks.push(stripExports(code));
}

const editableCopy = JSON.parse(await readFile(join(root, 'content', 'editable-copy.json'), 'utf8'));
chunks.push(`globalThis.TITAN_EDITABLE_COPY=${JSON.stringify(editableCopy).replace(/</g, '\\u003c')};\n`);
// Guides are authored once in app/lib/guideContent.mjs. The crawler HTML is
// rendered from that object by staticRouteContent.mjs; the React view reads the
// same object from this global. Neither surface can drift from the other.
const { GUIDES } = await import(new URL('../app/lib/guideContent.mjs', import.meta.url));
chunks.push(`globalThis.TITAN_GUIDES=${JSON.stringify(GUIDES).replace(/</g, '\\u003c')};\n`);
// The home hero's srcset is shared with the server-rendered preload for "/".
// Both read app/lib/homeHero.mjs so the two can never name different files.
// Plan prices come from the shared offer catalog (the only sanctioned source).
const { offer } = await import(new URL('../app/lib/offerCatalog.mjs', import.meta.url));
const planAmount = (id) => String(offer(id).pricing.amountUsd);
chunks.push(`const HOME_PLAN_PRICES=${JSON.stringify({ premium: planAmount('titanforge-premium-coaching'), standard: planAmount('titanforge-standard-coaching'), nutrition: planAmount('titanforge-nutrition-only'), community: planAmount('community-plus-fitbudd') })};\n`);
const { HOME_HERO_SRC, HOME_HERO_SRCSET, HOME_HERO_SIZES } = await import(new URL('../app/lib/homeHero.mjs', import.meta.url));
chunks.push(`const HOME_HERO_SRC=${JSON.stringify(HOME_HERO_SRC)};\nconst HOME_HERO_SRCSET=${JSON.stringify(HOME_HERO_SRCSET)};\nconst HOME_HERO_SIZES=${JSON.stringify(HOME_HERO_SIZES)};\n`);
for (const file of files) {
  chunks.push(`\n/* ---- ${file} ---- */\n`);
  chunks.push(await readFile(join(root, file), 'utf8'));
}

const tmp = await mkdtemp(join(tmpdir(), 'titanforge-bundle-'));
try {
  const entry = join(tmp, 'app.tsx');
  await writeFile(entry, chunks.join('\n'), 'utf8');
  await execFileAsync('npx', [
    '--yes',
    'esbuild@0.24.2',
    entry,
    '--loader:.jsx=jsx',
    '--loader:.tsx=tsx',
    '--jsx=transform',
    '--tsconfig-raw={"compilerOptions":{"jsx":"react"}}',
    '--jsx-factory=React.createElement',
    '--jsx-fragment=React.Fragment',
    '--format=iife',
    '--target=es2018',
    '--minify',
    '--legal-comments=none',
    '--outfile=assets/app.bundle.js',
  ], {
    cwd: root,
    maxBuffer: 1024 * 1024 * 10,
  });
  await mkdir(join(root, 'public', 'assets'), { recursive: true });
  await copyFile(join(root, 'assets', 'app.bundle.js'), join(root, 'public', 'assets', 'app.bundle.js'));
  for (const asset of ['tokens.css', 'site.css', 'components.css', 'pages.css', 'start.css', 'misc.css']) {
    await copyFile(join(root, 'assets', asset), join(root, 'public', 'assets', asset));
  }
  // coaching-intensive.css lives in app/ (imported by the Next layout) but
  // the static deployment never ships the Next CSS chunk, so the /apply form
  // renders unstyled. Copy it to public/assets like the other stylesheets;
  // layout.tsx links it from /assets/.
  await copyFile(join(root, 'app', 'coaching-intensive.css'), join(root, 'public', 'assets', 'coaching-intensive.css'));
  for (const asset of publicAssetFiles) {
    const destination = join(root, 'public', 'assets', asset);
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(join(root, 'assets', asset), destination);
  }
  for (const css of ['rail.css', 'motion.css']) {
    await copyFile(join(root, 'vendor/rail-kit', css), join(root, 'assets', css));
    await copyFile(join(root, 'vendor/rail-kit', css), join(root, 'public/assets', css));
  }
  console.log('wrote assets/app.bundle.js');
} finally {
  await rm(tmp, { recursive: true, force: true });
}
