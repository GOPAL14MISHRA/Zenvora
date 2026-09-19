import type { TeamMember } from '../../types';
import type { ITeamRepository } from '../interfaces/ITeamRepository';
import { team as initialData } from '../../data/team';

export class MockTeamRepository implements ITeamRepository {
  private store: TeamMember[] = [...initialData];

  async getAll(): Promise<TeamMember[]> {
    return [...this.store].sort((a, b) => a.order - b.order);
  }

  async getById(id: string): Promise<TeamMember | null> {
    return this.store.find((m) => m.id === id) ?? null;
  }

  async getPublished(): Promise<TeamMember[]> {
    return this.store.filter((m) => m.published).sort((a, b) => a.order - b.order);
  }

  async create(data: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>): Promise<TeamMember> {
    const now = new Date().toISOString();
    const member: TeamMember = { ...data, id: Date.now().toString(), createdAt: now, updatedAt: now };
    this.store.push(member);
    return member;
  }

  async update(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
    const index = this.store.findIndex((m) => m.id === id);
    if (index === -1) throw new Error(`Team member ${id} not found`);
    this.store[index] = { ...this.store[index], ...data, updatedAt: new Date().toISOString() };
    return this.store[index];
  }

  async delete(id: string): Promise<void> {
    this.store = this.store.filter((m) => m.id !== id);
  }
}

export const teamRepository = new MockTeamRepository();

