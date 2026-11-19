import Link from 'next/link';
import { getAllScience, SciencePost } from '../../lib/science';
import { BlogHeader, BlogFooter } from '../blog/components';

export const metadata = {
  title: 'Titan Forge Science Library | Evidence-Based Fitness & Nutrition',
  description:
    '50 comprehensive, evidence-based fitness science articles covering body recomposition, resistance training, nutrition, supplements, longevity over 40, and common fitness myths.',
  alternates: {
    canonical: 'https://titanforgefit.com/science',
  },
};

const PILLAR_CONFIG: Array<{
  id: string;
  title: string;
  subtitle: string;
}> = [
  {
    id: 'recomposition',
    title: 'Body Recomposition',
    subtitle:
      'Concurrent fat loss and muscle hypertrophy protocols, energy deficit sizing, and objective progress measurement.',
  },
  {
    id: 'training',
    title: 'Training & Hypertrophy',
    subtitle:
      'Progressive overload mechanics, weekly volume thresholds, rep ranges, proximity to failure, and periodisation.',
  },
  {
    id: 'nutrition',
    title: 'Nutrition & Energy Balance',
    subtitle:
      'Energy balance bioenergetics, daily protein targets, carbohydrate utilization, and long-term dietary adherence.',
  },
  {
    id: 'supplements',
    title: 'Supplements & Evidence',
    subtitle:
      'Clinical evaluations of creatine, caffeine, ashwagandha, protein powders, greens, and third-party testing.',
  },
  {
    id: 'over-40',
    title: 'Over-40 & Longevity',
    subtitle:
      'Training around joint pain, recovery capacity with age, sleep architecture, testosterone modulation, and sarcopenia.',
  },
  {
    id: 'myths',
    title: 'Myths & Debunked Claims',
    subtitle:
      'Evidence-based analysis of spot reduction, the anabolic window, toning myths, and metabolic slow-down claims.',
  },
];

export default function ScienceIndexPage() {
  const allPosts = getAllScience();

  const postsByPillar = PILLAR_CONFIG.reduce<Record<string, SciencePost[]>>((acc, pillar) => {
    acc[pillar.id] = allPosts.filter((p) => p.pillar === pillar.id || (p.tags && p.tags[0] === pillar.id));
    return acc;
  }, {});

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <BlogHeader currentRoute="/science" />
      <main id="main-content" className="crawler-page">
        <div className="blog-container">
          <header className="blog-header">
            <span className="tf-eyebrow">Titan Forge Science Library</span>
            <h1 className="blog-title">Evidence-Based Training & Nutrition Science</h1>
            <p className="blog-subtitle">
              50 comprehensive, peer-reviewed deep dives into human clinical trials, metabolic physiology, and practical application. Every claim is cited directly from biomedical literature.
            </p>
            <p className="blog-subtitle">
              New to reading research? See <Link href="/guides/how-we-read-a-study">how we read a study</Link>, or what the research says for <Link href="/for/natural-lifters-over-40">natural lifters over 40</Link>.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px', justifyContent: 'center' }}>
              {PILLAR_CONFIG.map((pillar) => (
                <a
                  key={pillar.id}
                  href={`#${pillar.id}`}
                  className="blog-tag"
                  style={{ textDecoration: 'none', cursor: 'pointer', padding: '6px 12px' }}
                >
                  {pillar.title} ({postsByPillar[pillar.id]?.length || 0})
                </a>
              ))}
            </div>
          </header>

          {PILLAR_CONFIG.map((pillar) => {
            const posts = postsByPillar[pillar.id] || [];
            if (posts.length === 0) return null;

            return (
              <section key={pillar.id} id={pillar.id} style={{ marginBottom: '48px', scrollMarginTop: '80px' }}>
                <div style={{ marginBottom: '24px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
                  <h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)', color: 'var(--text-bright)', margin: '0 0 6px 0' }}>
                    {pillar.title}
                  </h2>
                  <p style={{ color: 'var(--text-dim)', margin: 0, fontSize: '15px' }}>
                    {pillar.subtitle}
                  </p>
                </div>

                <div className="blog-grid">
                  {posts.map((post) => (
                    <article key={post.slug} className="blog-card">
                      <div className="blog-meta">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                        {post.tags && post.tags.length > 0 && (
                          <span className="blog-tag">
                            {post.tags[0]}
                          </span>
                        )}
                      </div>
                      <Link href={`/science/${post.slug}`}>
                        <h3 className="blog-card-title" style={{ fontSize: '18px', lineHeight: '1.4' }}>
                          {post.title}
                        </h3>
                      </Link>
                      <p className="blog-card-desc">
                        {post.description}
                      </p>
                      <Link href={`/science/${post.slug}`} className="blog-card-link">
                        Read analysis <span className="arr">→</span>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <BlogFooter />
    </>
  );
}
