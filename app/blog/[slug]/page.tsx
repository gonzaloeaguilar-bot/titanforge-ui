import { getPostBySlug, getPostSlugs } from '../../../lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlogHeader, BlogFooter } from '../components';
import SteveCompanion from './SteveCompanion';

type Faq = { question: string; answer: string };

function getFaqs(content: string): Faq[] {
  const faqSection = content.match(/^## FAQ\s*$([\s\S]*)/m)?.[1] || '';
  return faqSection
    .split(/^### /m)
    .slice(1)
    .map((entry) => {
      const [question, ...answerLines] = entry.split('\n');
      return { question: question.trim(), answer: answerLines.join('\n').trim() };
    });
}

function plainText(markdown: string): string {
  return markdown
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getShortAnswer(post: { content: string; description?: string }): string {
  const beforeFaq = post.content.split(/^## FAQ\s*$/m)[0] || post.content;
  const firstParagraph = beforeFaq
    .split(/\n{2,}/)
    .map((part) => plainText(part))
    .find((part) => part && !part.startsWith('import ') && !part.startsWith('export '));

  return (firstParagraph || post.description || '').slice(0, 340);
}

function formatPublishedDate(date: string): string {
  // Parse date-only front matter in UTC so readers do not see the previous day
  // in time zones west of Greenwich.
  const [year, month, day] = date.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return {
    title: `${post.title} | Titan Forge Fitness`,
    description: post.description,
    alternates: { canonical: `https://titanforgefit.com/blog/${post.slug}` },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const faqs = getFaqs(post.content);
  const shortAnswer = getShortAnswer(post);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
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
      <BlogHeader currentRoute="/blog" />
      <main id="main-content" className="crawler-page">
        <div className="blog-container">
          <article className="blog-article">
            <Link href="/blog" className="blog-back-link">
              ← Back to the blog
            </Link>
            
            <header className="blog-header">
              <h1 className="blog-title">{post.title}</h1>
              <div className="blog-meta">
                <time dateTime={post.date}>
                  {formatPublishedDate(post.date)}
                </time>
                <span>•</span>
                <span>{post.author || 'Titan Forge Team'}</span>
              </div>
            </header>
            
            <div className="blog-content">
              <MDXRemote source={post.content} />
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
      <div className="blog-container">
          <SteveCompanion slug={post.slug} title={post.title} shortAnswer={shortAnswer} faqs={faqs} />
      </div>
      <BlogFooter />
    </>
  );
}
