import Link from 'next/link';
import { getAllPosts } from '../../lib/blog';
import { BlogHeader, BlogFooter } from './components';

export const metadata = {
  title: 'Titan Forge Blog | Fitness, Training & Nutrition',
  description: 'Articles and guides on strength training, nutrition, recovery, and fitness coaching.',
  alternates: { canonical: 'https://titanforgefit.com/blog' },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <BlogHeader currentRoute="/blog" />
      <main id="main-content" className="crawler-page">
        <div className="blog-container">
          <header className="blog-header">
            <span className="tf-eyebrow">Titan Forge Blog</span>
            <h1 className="blog-title">Training & Fitness Insights</h1>
            <p className="blog-subtitle">
              Articles and guides on strength training, nutrition, recovery, and executive fitness.
            </p>
          </header>

          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post.slug} className="blog-card">
                <div className="blog-meta">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                  {post.tags && post.tags.length > 0 && (
                    <span className="blog-tag">
                      {post.tags[0]}
                    </span>
                  )}
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="blog-card-title">
                    {post.title}
                  </h2>
                </Link>
                <p className="blog-card-desc">
                  {post.description}
                </p>
                <Link href={`/blog/${post.slug}`} className="blog-card-link">
                  Read article <span className="arr">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <BlogFooter />
    </>
  );
}
