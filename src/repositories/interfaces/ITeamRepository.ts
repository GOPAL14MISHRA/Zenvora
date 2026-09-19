import type { TeamMember } from '../../types';

export interface ITeamRepository {
  getAll(): Promise<TeamMember[]>;
  getById(id: string): Promise<TeamMember | null>;
  getPublished(): Promise<TeamMember[]>;
  create(data: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>): Promise<TeamMember>;
  update(id: string, data: Partial<TeamMember>): Promise<TeamMember>;
  delete(id: string): Promise<void>;
}
