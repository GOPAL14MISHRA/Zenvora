import type { SiteSettings } from '../../types';
import type { ISettingsRepository } from '../interfaces/ISettingsRepository';
import { siteSettings as initialData } from '../../data/siteSettings';

export class MockSettingsRepository implements ISettingsRepository {
  private store: SiteSettings = { ...initialData };

  async get(): Promise<SiteSettings> {
    return { ...this.store };
  }

  async update(data: Partial<SiteSettings>): Promise<SiteSettings> {
    this.store = { ...this.store, ...data };
    return { ...this.store };
  }
}

export const settingsRepository = new MockSettingsRepository();

