import type { Project } from '../../types';

export interface IProjectRepository {
  getAll(): Promise<Project[]>;
  getById(id: string): Promise<Project | null>;
  getBySlug(slug: string): Promise<Project | null>;
  getFeatured(): Promise<Project[]>;
  getPublished(): Promise<Project[]>;
  create(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project>;
  update(id: string, data: Partial<Project>): Promise<Project>;
  delete(id: string): Promise<void>;
  subscribe(callback: (data: Project[]) => void): () => void;
}
