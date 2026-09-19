import type { SiteSettings } from '../../types';

export interface ISettingsRepository {
  get(): Promise<SiteSettings>;
  update(data: Partial<SiteSettings>): Promise<SiteSettings>;
}
