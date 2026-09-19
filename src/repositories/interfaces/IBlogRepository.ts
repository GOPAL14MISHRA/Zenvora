import type { BlogPost } from '../../types';

export interface IBlogRepository {
  getAll(): Promise<BlogPost[]>;
  getById(id: string): Promise<BlogPost | null>;
  getBySlug(slug: string): Promise<BlogPost | null>;
  getFeatured(): Promise<BlogPost[]>;
  getPublished(): Promise<BlogPost[]>;
  getByCategory(category: string): Promise<BlogPost[]>;
  create(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost>;
  update(id: string, data: Partial<BlogPost>): Promise<BlogPost>;
  delete(id: string): Promise<void>;
}
