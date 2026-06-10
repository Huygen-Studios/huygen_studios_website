import { MetadataRoute } from 'next';
import { blogArticles } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = blogArticles.map((article) => ({
    url: `https://huygenstudios.com/blog/${article.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: 'https://huygenstudios.com',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://huygenstudios.com/services',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://huygenstudios.com/pricing',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://huygenstudios.com/contact',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://huygenstudios.com/about',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://huygenstudios.com/faq',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://huygenstudios.com/projects',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://huygenstudios.com/blog',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts,
  ];
}
