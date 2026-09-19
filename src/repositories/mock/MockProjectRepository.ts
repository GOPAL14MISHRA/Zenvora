import type { Project } from '../../types';
import type { IProjectRepository } from '../interfaces/IProjectRepository';
import { projects as initialData } from '../../data/projects';

export class MockProjectRepository implements IProjectRepository {
  private store: Project[] = [...initialData];

  async getAll(): Promise<Project[]> {
    return [...this.store].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getById(id: string): Promise<Project | null> {
    return this.store.find((p) => p.id === id) ?? null;
  }

  async getBySlug(slug: string): Promise<Project | null> {
    return this.store.find((p) => p.slug === slug) ?? null;
  }

  async getFeatured(): Promise<Project[]> {
    return this.store.filter((p) => p.featured && p.published);
  }

  async getPublished(): Promise<Project[]> {
    return this.store.filter((p) => p.published);
  }

  async create(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const now = new Date().toISOString();
    const project: Project = {
      ...data,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    this.store.push(project);
    return project;
  }

  async update(id: string, data: Partial<Project>): Promise<Project> {
    const index = this.store.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Project ${id} not found`);
    this.store[index] = { ...this.store[index], ...data, updatedAt: new Date().toISOString() };
    return this.store[index];
  }

  async delete(id: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 600));
    this.store = this.store.filter((p) => p.id !== id);
  }

  subscribe(callback: (data: Project[]) => void): () => void {
    callback(this.store);
    return () => {};
  }
}

export const projectRepository = new MockProjectRepository();
