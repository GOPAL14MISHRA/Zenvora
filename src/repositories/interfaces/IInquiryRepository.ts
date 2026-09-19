import type { Inquiry, InquiryStatus } from '../../types';

export interface IInquiryRepository {
  getAll(): Promise<Inquiry[]>;
  getById(id: string): Promise<Inquiry | null>;
  create(data: Omit<Inquiry, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Inquiry>;
  updateStatus(id: string, status: InquiryStatus): Promise<Inquiry>;
  delete(id: string): Promise<void>;
  subscribe(callback: (data: Inquiry[]) => void): () => void;
}
