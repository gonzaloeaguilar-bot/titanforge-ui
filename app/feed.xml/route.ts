import { getAllPosts } from '../../lib/blog';
import { SITE_ORIGIN } from '../lib/titanSeo';

export async function GET() {
  const posts = getAllPosts();
  
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Titan Forge Engineering Blog</title>
    <link>${SITE_ORIGIN}/blog</link>
    <description>Technical deep dives on B2B AI automation and growth engineering.</description>
    <language>en-us</language>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <link>${SITE_ORIGIN}/blog/${post.slug}</link>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description || ''}]]></description>
    </item>
    `
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
