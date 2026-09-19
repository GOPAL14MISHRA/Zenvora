import type { Service } from '../../types';
import type { IServiceRepository } from '../interfaces/IServiceRepository';
import { services as initialData } from '../../data/services';

export class MockServiceRepository implements IServiceRepository {
  private store: Service[] = [...initialData];

  async getAll(): Promise<Service[]> {
    return [...this.store].sort((a, b) => a.order - b.order);
  }

  async getById(id: string): Promise<Service | null> {
    return this.store.find((s) => s.id === id) ?? null;
  }

  async getPublished(): Promise<Service[]> {
    return this.store.filter((s) => s.published).sort((a, b) => a.order - b.order);
  }

  async create(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
    const now = new Date().toISOString();
    const service: Service = { ...data, id: Date.now().toString(), createdAt: now, updatedAt: now };
    this.store.push(service);
    return service;
  }

  async update(id: string, data: Partial<Service>): Promise<Service> {
    const index = this.store.findIndex((s) => s.id === id);
    if (index === -1) throw new Error(`Service ${id} not found`);
    this.store[index] = { ...this.store[index], ...data, updatedAt: new Date().toISOString() };
    return this.store[index];
  }

  async delete(id: string): Promise<void> {
    this.store = this.store.filter((s) => s.id !== id);
  }
}

export const serviceRepository = new MockServiceRepository();

