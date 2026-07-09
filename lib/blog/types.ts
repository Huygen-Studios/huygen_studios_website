export interface BlogAuthor {
  name: string;
  avatar?: string;
  role?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  contentHtml?: string;
  contentMarkdown?: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt: string;
  author: BlogAuthor;
  category: string;
  tags?: string[];
  readingTime: string;
  canonicalUrl?: string;
}
