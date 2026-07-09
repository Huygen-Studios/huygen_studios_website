export interface MarbleAuthor {
  id: string;
  name: string;
  image?: string;
  bio?: string;
  role?: string;
  slug: string;
}

export interface MarbleCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface MarbleTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface MarblePost {
  id: string;
  slug: string;
  title: string;
  status: string;
  featured?: boolean;
  coverImage?: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  authors?: MarbleAuthor[];
  category?: MarbleCategory;
  tags?: MarbleTag[];
  content?: string; // HTML content or main content body
}

export interface MarblePostsResponse {
  posts: MarblePost[];
  pagination?: {
    limit: number;
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface MarblePostResponse {
  post: MarblePost;
}
export interface MarbleDataResponse {
  data: MarblePost;
}
export interface MarbleListDataResponse {
  data: MarblePost[];
}
export interface MarblePostsDataResponse {
  posts?: MarblePost[];
  data?: MarblePost[];
  post?: MarblePost;
}
