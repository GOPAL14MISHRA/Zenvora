import { useEffect, useState } from 'react';
import { settingsRepository } from '../../repositories/mock/MockSettingsRepository';
import type { SiteSettings } from '../../types';
import { siteSettings as defaultSettings } from '../../data/siteSettings';

const tabs = ['General', 'Homepage', 'Contact', 'Social', 'SEO', 'Footer'];

export function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('General');
  const [form, setForm] = useState<SiteSettings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    settingsRepository.get().then(setForm);
  }, []);

  const set = (key: keyof SiteSettings, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    await settingsRepository.update(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const InputField = ({ label, field, type = 'text', placeholder = '' }: {
    label: string; field: keyof SiteSettings; type?: string; placeholder?: string;
  }) => (
    <div>
      <label className="label-base">{label}</label>
      <input
        type={type}
        value={(form[field] as string) ?? ''}
        onChange={(e) => set(field, e.target.value)}
        placeholder={placeholder}
        className="input-base"
      />
    </div>
  );

  const TextareaField = ({ label, field, rows = 3 }: { label: string; field: keyof SiteSettings; rows?: number }) => (
    <div>
      <label className="label-base">{label}</label>
      <textarea
        value={(form[field] as string) ?? ''}
        onChange={(e) => set(field, e.target.value)}
        rows={rows}
        className="input-base resize-none"
      />
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DED9D0] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#171717]">Site Settings</h1>
          <p className="text-[#6B665E] text-xs mt-0.5">Manage global branding, SEO, contact info, and website copy.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary text-xs py-2.5 px-5 disabled:opacity-60 cursor-pointer">
          {saving ? 'Saving...' : saved ? '✓ Changes Saved' : 'Save Settings'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#DED9D0] pb-px overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all cursor-pointer rounded-t-xl ${
              activeTab === tab
                ? 'text-[#E85D3F] border-b-2 border-[#E85D3F] bg-[#FFFFFF]'
                : 'text-[#6B665E] hover:text-[#171717] hover:bg-white/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs max-w-2xl">
        {activeTab === 'General' && (
          <div className="space-y-4">
            <InputField label="Company Name" field="companyName" />
            <InputField label="Tagline" field="tagline" />
            <InputField label="Email" field="email" type="email" />
            <InputField label="Phone (optional)" field="phone" />
            <InputField label="Location" field="location" />
          </div>
        )}

        {activeTab === 'Homepage' && (
          <div className="space-y-4">
            <TextareaField label="Hero Title" field="heroTitle" rows={2} />
            <TextareaField label="Hero Description" field="heroDescription" rows={3} />
            <InputField label="Hero CTA Text" field="heroCTA" />
            <div>
              <label className="label-base">Technology Badges (comma-separated)</label>
              <input
                value={form.techBadges.join(', ')}
                onChange={(e) => set('techBadges', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                className="input-base"
                placeholder="React, Next.js, TypeScript..."
              />
            </div>
            <div>
              <p className="label-base mb-3">Stats</p>
              <div className="space-y-2">
                {form.stats.map((stat, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2">
                    <input
                      value={stat.value}
                      onChange={(e) => {
                        const updated = [...form.stats];
                        updated[i] = { ...updated[i], value: e.target.value };
                        set('stats', updated);
                      }}
                      placeholder="20+"
                      className="input-base py-2 text-xs"
                    />
                    <input
                      value={stat.label}
                      onChange={(e) => {
                        const updated = [...form.stats];
                        updated[i] = { ...updated[i], label: e.target.value };
                        set('stats', updated);
                      }}
                      placeholder="Projects Built"
                      className="input-base py-2 text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Contact' && (
          <div className="space-y-4">
            <InputField label="Contact Email" field="contactEmail" type="email" />
            <InputField label="Contact Phone" field="contactPhone" />
            <InputField label="Location" field="contactLocation" />
            <InputField label="Availability" field="availability" />
          </div>
        )}

        {activeTab === 'Social' && (
          <div className="space-y-4">
            <InputField label="GitHub URL" field="github" placeholder="https://github.com/..." />
            <InputField label="LinkedIn URL" field="linkedin" placeholder="https://linkedin.com/..." />
            <InputField label="Instagram URL" field="instagram" placeholder="https://instagram.com/..." />
            <InputField label="X (Twitter) URL" field="twitter" placeholder="https://x.com/..." />
          </div>
        )}

        {activeTab === 'SEO' && (
          <div className="space-y-4">
            <InputField label="Meta Title" field="metaTitle" />
            <TextareaField label="Meta Description" field="metaDescription" rows={3} />
            <InputField label="OG Image URL" field="ogImage" />
          </div>
        )}

        {activeTab === 'Footer' && (
          <div className="space-y-4">
            <TextareaField label="Footer Description" field="footerDescription" rows={2} />
            <InputField label="Copyright Text" field="copyright" />
          </div>
        )}
      </div>
    </div>
  );
}
