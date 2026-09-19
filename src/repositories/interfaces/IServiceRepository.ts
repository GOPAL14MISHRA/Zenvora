import type { Service } from '../../types';

export interface IServiceRepository {
  getAll(): Promise<Service[]>;
  getById(id: string): Promise<Service | null>;
  getPublished(): Promise<Service[]>;
  create(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service>;
  update(id: string, data: Partial<Service>): Promise<Service>;
  delete(id: string): Promise<void>;
}
