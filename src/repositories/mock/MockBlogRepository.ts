import type { BlogPost } from '../../types';
import type { IBlogRepository } from '../interfaces/IBlogRepository';
import { blogPosts as initialData } from '../../data/blogs';

export class MockBlogRepository implements IBlogRepository {
  private store: BlogPost[] = [...initialData];

  async getAll(): Promise<BlogPost[]> {
    return [...this.store].sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getById(id: string): Promise<BlogPost | null> {
    return this.store.find((p) => p.id === id) ?? null;
  }

  async getBySlug(slug: string): Promise<BlogPost | null> {
    return this.store.find((p) => p.slug === slug) ?? null;
  }

  async getFeatured(): Promise<BlogPost[]> {
    return this.store.filter((p) => p.featured && p.published);
  }

  async getPublished(): Promise<BlogPost[]> {
    return this.store.filter((p) => p.published).sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getByCategory(category: string): Promise<BlogPost[]> {
    return this.store.filter((p) => p.published && p.category === category);
  }

  async create(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const now = new Date().toISOString();
    const post: BlogPost = {
      ...data,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    this.store.push(post);
    return post;
  }

  async update(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
    const index = this.store.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Blog post ${id} not found`);
    this.store[index] = { ...this.store[index], ...data, updatedAt: new Date().toISOString() };
    return this.store[index];
  }

  async delete(id: string): Promise<void> {
    this.store = this.store.filter((p) => p.id !== id);
  }
}

export const blogRepository = new MockBlogRepository();

