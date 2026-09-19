import type { Testimonial } from '../../types';
import type { ITestimonialRepository } from '../interfaces/ITestimonialRepository';
import { testimonials as initialData } from '../../data/testimonials';

export class MockTestimonialRepository implements ITestimonialRepository {
  private store: Testimonial[] = [...initialData];

  async getAll(): Promise<Testimonial[]> {
    return [...this.store];
  }

  async getById(id: string): Promise<Testimonial | null> {
    return this.store.find((t) => t.id === id) ?? null;
  }

  async getPublished(): Promise<Testimonial[]> {
    return this.store.filter((t) => t.published);
  }

  async create(data: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<Testimonial> {
    const now = new Date().toISOString();
    const testimonial: Testimonial = { ...data, id: Date.now().toString(), createdAt: now, updatedAt: now };
    this.store.push(testimonial);
    return testimonial;
  }

  async update(id: string, data: Partial<Testimonial>): Promise<Testimonial> {
    const index = this.store.findIndex((t) => t.id === id);
    if (index === -1) throw new Error(`Testimonial ${id} not found`);
    this.store[index] = { ...this.store[index], ...data, updatedAt: new Date().toISOString() };
    return this.store[index];
  }

  async delete(id: string): Promise<void> {
    this.store = this.store.filter((t) => t.id !== id);
  }
}

export const testimonialRepository = new MockTestimonialRepository();

