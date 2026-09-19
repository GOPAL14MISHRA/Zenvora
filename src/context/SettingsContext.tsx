import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SiteSettings } from '../types';
import { settingsRepository } from '../repositories/mock/MockSettingsRepository';
import { siteSettings as defaultSettings } from '../data/siteSettings';

interface SettingsContextValue {
  settings: SiteSettings;
  updateSettings: (data: Partial<SiteSettings>) => Promise<void>;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    settingsRepository.get().then((s) => {
      setSettings(s);
      setIsLoading(false);
    });
  }, []);

  const updateSettings = async (data: Partial<SiteSettings>) => {
    const updated = await settingsRepository.update(data);
    setSettings(updated);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
