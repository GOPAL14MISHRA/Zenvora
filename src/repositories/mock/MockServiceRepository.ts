import type { Service } from '../../types';
import type { IServiceRepository } from '../interfaces/IServiceRepository';
import { services as initialData } from '../../data/services';

const STORAGE_KEY = 'zenvora_services';

export class MockServiceRepository implements IServiceRepository {
  private get store(): Service[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored services', e);
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return [...initialData];
  }

  private set store(data: Service[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

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
    const currentStore = this.store;
    currentStore.push(service);
    this.store = currentStore;
    return service;
  }

  async update(id: string, data: Partial<Service>): Promise<Service> {
    const currentStore = this.store;
    const index = currentStore.findIndex((s) => s.id === id);
    if (index === -1) throw new Error(`Service ${id} not found`);
    currentStore[index] = { ...currentStore[index], ...data, updatedAt: new Date().toISOString() };
    this.store = currentStore;
    return currentStore[index];
  }

  async delete(id: string): Promise<void> {
    this.store = this.store.filter((s) => s.id !== id);
  }
}

export const serviceRepository = new MockServiceRepository();

