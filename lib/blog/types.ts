export interface BlogAuthor {
  id?: string;
  name: string;
  avatarUrl?: string | null;
  role?: string;
}

export interface BlogCategory {
  id?: string;
  name: string;
  slug?: string;
}

export interface BlogTag {
  id?: string;
  name: string;
  slug?: string;
}

export interface BlogCoverImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  contentHtml: string;
  contentMarkdown?: string;
  publishedAt: string | null;
  updatedAt: string | null;
  category: BlogCategory | null;
  authors: BlogAuthor[];
  tags: BlogTag[];
  coverImage: BlogCoverImage | null;
  readingTime: string;
  canonicalUrl?: string;
}
