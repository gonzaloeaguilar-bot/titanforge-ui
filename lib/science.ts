import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content', 'science');

const VALID_PILLARS = ['recomposition', 'training', 'nutrition', 'supplements', 'over-40', 'myths'] as const;

export type SciencePost = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  description?: string;
  author?: string;
  tags?: string[];
  pillar?: string;
  draft?: boolean;
  content: string;
};

function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  if (!raw.startsWith('---')) {
    return { data: {}, content: raw };
  }
  const end = raw.indexOf('\n---', 3);
  if (end === -1) {
    return { data: {}, content: raw };
  }
  const head = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\r?\n/, '');
  const data: Record<string, any> = {};

  let currentKey: string | null = null;
  for (const rawLine of head.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    if (/^\s*-\s+/.test(rawLine) && currentKey) {
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = [];
      }
      data[currentKey].push(rawLine.replace(/^\s*-\s+/, '').trim().replace(/^["']|["']$/g, ''));
      continue;
    }

    const colonIdx = rawLine.indexOf(':');
    if (colonIdx !== -1) {
      const key = rawLine.slice(0, colonIdx).trim();
      let val = rawLine.slice(colonIdx + 1).trim();
      currentKey = key;

      if (val.startsWith('[') && val.endsWith(']')) {
        data[key] = val
          .slice(1, -1)
          .split(',')
          .map((v) => v.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean);
      } else if (val.toLowerCase() === 'true') {
        data[key] = true;
      } else if (val.toLowerCase() === 'false') {
        data[key] = false;
      } else {
        data[key] = val.replace(/^["']|["']$/g, '');
      }
    }
  }

  return { data, content: body };
}

function resolvePillar(dataPillar?: string, tags: string[] = []): string {
  if (dataPillar && VALID_PILLARS.includes(dataPillar.toLowerCase() as any)) {
    return dataPillar.toLowerCase();
  }
  const lowerTags = tags.map((t) => t.toLowerCase());
  for (const pillar of VALID_PILLARS) {
    if (lowerTags.includes(pillar)) return pillar;
  }
  if (lowerTags.some((t) => ['body-composition', 'fat-loss'].includes(t))) return 'recomposition';
  if (lowerTags.some((t) => ['hypertrophy', 'programming', 'volume', 'recovery'].includes(t))) return 'training';
  if (lowerTags.some((t) => ['macros', 'protein'].includes(t))) return 'nutrition';
  if (lowerTags.some((t) => ['evidence'].includes(t))) return 'supplements';
  if (lowerTags.some((t) => ['longevity'].includes(t))) return 'over-40';
  return lowerTags[0] || 'training';
}

export function getScienceSlugs() {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith('.mdx') && !file.startsWith('_'));
}

export function getScienceBySlug(slug: string): SciencePost | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);
  let fileContents: string;

  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch {
    return null;
  }

  const { data, content } = parseFrontmatter(fileContents);

  if (data.draft === true || String(data.draft).toLowerCase() === 'true') {
    return null;
  }

  const tags: string[] = Array.isArray(data.tags) ? data.tags : [];
  const pillar = resolvePillar(data.pillar, tags);

  return {
    slug: realSlug,
    title: data.title || '',
    date: data.date || '',
    updated: data.updated || undefined,
    description: data.description || '',
    author: data.author || 'Steve "Doc" Ginevan, PhD',
    tags,
    pillar,
    draft: Boolean(data.draft),
    content,
  };
}

export function getAllScience(): SciencePost[] {
  const slugs = getScienceSlugs();
  const posts = slugs
    .map((slug) => getScienceBySlug(slug))
    .filter((post): post is SciencePost => post !== null)
    // sort posts by date in descending order, then by title
    .sort((post1, post2) => {
      if (post1.date !== post2.date) {
        return post1.date > post2.date ? -1 : 1;
      }
      return post1.title.localeCompare(post2.title);
    });
  return posts;
}
