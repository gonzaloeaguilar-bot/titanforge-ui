import { getScienceBySlug, getAllScience } from '../../../lib/science';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlogHeader, BlogFooter } from '../../blog/components';

type Faq = { question: string; answer: string };

function getFaqs(content: string): Faq[] {
  const faqSection = content.match(/^(?:##|###)\s*(?:FAQ|Frequently Asked Questions)\s*$([\s\S]*)/im)?.[1] || '';
  if (!faqSection) return [];
  return faqSection
    .split(/^### /m)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [question, ...answerLines] = entry.split('\n');
      return { question: question.trim(), answer: answerLines.join('\n').trim() };
    })
    .filter((faq) => faq.question.length > 0 && faq.answer.length > 0);
}

function sanitizeMdx(source: string): string {
  let text = source;
  // Fix LaTeX math equations with \text{...}
  text = text.replace(/\$\$\\text\{([^}]+)\}\s*=\s*\\text\{([^}]+)\}\s*-\s*\\text\{([^}]+)\}\$\$/g, '**$1 = $2 - $3**');
  text = text.replace(/\$\^2\\text\{H\}\$/g, '²H');
  text = text.replace(/\$\^\{18\}\\text\{O\}\$/g, '¹⁸O');
  text = text.replace(/\\text\{([^}]+)\}/g, '$1');
  // Escape < when not a valid HTML tag name
  text = text.replace(/<(?=[0-9=\s])/g, '&lt;');
  return text;
}

export async function generateStaticParams() {
  const posts = getAllScience();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Title-only overrides (the on-page H1 and the MDX frontmatter title are unchanged). Both pages
// get 2,000+ impressions from quoted-PMID lookups at position ~8 with 0 clicks (GSC 2026-07-09..10-05),
// so the <title> leads with the finding. Each title states only what the PubMed abstract reports (41343037: volume and strength/size gains rise with diminishing returns; 38393985: 2 and 1 reps in reserve vs failure, similar hypertrophy).
const SERP_TITLE_OVERRIDES: Record<string, string> = {
  'how-many-sets-per-muscle-per-week': 'Weekly Sets and Muscle Growth: Diminishing Returns, What PMID 41343037 Found',
  'how-close-to-failure-to-train': '1-2 Reps From Failure vs To Failure: What PMID 38393985 Found',
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getScienceBySlug(slug);
  if (!post) notFound();
  const serpTitle = SERP_TITLE_OVERRIDES[slug];
  return {
    title: serpTitle ? { absolute: serpTitle } : `${post.title} | Titan Forge Fitness`,
    description: post.description,
    alternates: {
      canonical: `https://titanforgefit.com/science/${slug}`,
    },
    openGraph: {
      title: serpTitle ?? `${post.title} | Titan Forge Fitness`,
      description: post.description,
      url: `https://titanforgefit.com/science/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'Titan Forge Team'],
    },
  };
}

export default async function SciencePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getScienceBySlug(slug);
  if (!post) notFound();
  const faqs = getFaqs(post.content);
  const cleanMdx = sanitizeMdx(post.content);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.updated || post.date,
            author: {
              // Organisation byline, not an individual coach: posts are Titan Forge
              // editorial, not any one coach's personal work.
              '@type': 'Organization',
              name: post.author || 'Titan Forge Team',
              url: 'https://titanforgefit.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Titan Forge Fitness',
              url: 'https://titanforgefit.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://titanforgefit.com/assets/images/site-logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://titanforgefit.com/science/${post.slug}`,
            },
          }).replace(/</g, '\\u003c'),
        }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map(({ question, answer }) => ({
                '@type': 'Question',
                name: question,
                acceptedAnswer: { '@type': 'Answer', text: answer },
              })),
            }).replace(/</g, '\\u003c'),
          }}
        />
      )}
      <BlogHeader currentRoute="/science" />
      <main id="main-content" className="crawler-page">
        <div className="blog-container">
          <article className="blog-article">
            <Link href="/science" className="blog-back-link">
              ← Back to Science Library
            </Link>
            
            <header className="blog-header">
              {post.pillar && (
                <div style={{ marginBottom: '8px' }}>
                  <span className="blog-tag" style={{ textTransform: 'capitalize' }}>
                    {post.pillar.replace('-', ' ')}
                  </span>
                </div>
              )}
              <h1 className="blog-title">{post.title}</h1>
              <div className="blog-meta">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                {post.updated && post.updated > post.date && (
                  <>
                    <span>•</span>
                    <span>
                      Updated{' '}
                      <time dateTime={post.updated}>
                        {new Date(`${post.updated}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
                      </time>
                    </span>
                  </>
                )}
                <span>•</span>
                <span>{post.author || 'Steve "Doc" Ginevan, PhD'}</span>
                {post.tags && post.tags.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{post.tags.slice(0, 3).join(', ')}</span>
                  </>
                )}
              </div>
            </header>
            
            <div className="blog-content">
              <MDXRemote source={cleanMdx} />
            </div>

            <section className="blog-cta-block">
              <h3 className="blog-cta-title">Ready to Stop Guessing?</h3>
              <p className="blog-cta-desc">
                Apply for personalized fitness coaching designed around your goals, schedule, and recovery needs. Train with intention.
              </p>
              <Link href="/coaching-intensive#apply" className="btn btn--ember">
                Apply For Coaching <span className="arr">→</span>
              </Link>
            </section>
          </article>
        </div>
      </main>
      <BlogFooter />
    </>
  );
}
