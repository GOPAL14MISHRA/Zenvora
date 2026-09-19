import type { Testimonial } from '../../types';

export interface ITestimonialRepository {
  getAll(): Promise<Testimonial[]>;
  getById(id: string): Promise<Testimonial | null>;
  getPublished(): Promise<Testimonial[]>;
  create(data: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<Testimonial>;
  update(id: string, data: Partial<Testimonial>): Promise<Testimonial>;
  delete(id: string): Promise<void>;
}
