import type { Inquiry, InquiryStatus } from '../../types';
import type { IInquiryRepository } from '../interfaces/IInquiryRepository';
import { inquiries as initialData } from '../../data/inquiries';

export class MockInquiryRepository implements IInquiryRepository {
  private store: Inquiry[] = [...initialData];

  async getAll(): Promise<Inquiry[]> {
    return [...this.store].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getById(id: string): Promise<Inquiry | null> {
    return this.store.find((i) => i.id === id) ?? null;
  }

  async create(data: Omit<Inquiry, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Inquiry> {
    const now = new Date().toISOString();
    const inquiry: Inquiry = {
      ...data,
      id: Date.now().toString(),
      status: 'New',
      createdAt: now,
      updatedAt: now,
    };
    this.store.unshift(inquiry);
    return inquiry;
  }

  async updateStatus(id: string, status: InquiryStatus): Promise<Inquiry> {
    const index = this.store.findIndex((i) => i.id === id);
    if (index === -1) throw new Error(`Inquiry ${id} not found`);
    this.store[index] = { ...this.store[index], status, updatedAt: new Date().toISOString() };
    return this.store[index];
  }

  async delete(id: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 600));
    this.store = this.store.filter((i) => i.id !== id);
  }

  subscribe(callback: (data: Inquiry[]) => void): () => void {
    callback(this.store);
    return () => {};
  }
}

export const inquiryRepository = new MockInquiryRepository();
