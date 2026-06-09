'use client';

/**
 * Settings Management
 */

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import FormField from '@/components/admin/FormField';

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings', { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        const settingsMap: any = {};
        data.data.forEach((item: any) => {
          settingsMap[item.key_name] = item.key_value;
        });
        setSettings(settingsMap);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        alert('Settings saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <PageHeader title="Settings" description="Configure your website settings" />

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        
        <FormField
          label="Site Name"
          name="site_name"
          value={settings.site_name || ''}
          onChange={handleChange}
          required
        />

        <FormField
          label="Site Tagline"
          name="site_tagline"
          value={settings.site_tagline || ''}
          onChange={handleChange}
        />

        <FormField
          label="Site Description"
          name="site_description"
          type="textarea"
          value={settings.site_description || ''}
          onChange={handleChange}
        />

        <h2 className="text-xl font-semibold mb-4 mt-8">Contact Information</h2>

        <FormField
          label="Contact Email"
          name="contact_email"
          type="email"
          value={settings.contact_email || ''}
          onChange={handleChange}
        />

        <FormField
          label="Contact Phone"
          name="contact_phone"
          value={settings.contact_phone || ''}
          onChange={handleChange}
        />

        <FormField
          label="Contact Address"
          name="contact_address"
          type="textarea"
          value={settings.contact_address || ''}
          onChange={handleChange}
        />

        <h2 className="text-xl font-semibold mb-4 mt-8">Social Media</h2>

        <FormField
          label="Facebook URL"
          name="social_facebook"
          type="url"
          value={settings.social_facebook || ''}
          onChange={handleChange}
        />

        <FormField
          label="Twitter URL"
          name="social_twitter"
          type="url"
          value={settings.social_twitter || ''}
          onChange={handleChange}
        />

        <FormField
          label="LinkedIn URL"
          name="social_linkedin"
          type="url"
          value={settings.social_linkedin || ''}
          onChange={handleChange}
        />

        <FormField
          label="Instagram URL"
          name="social_instagram"
          type="url"
          value={settings.social_instagram || ''}
          onChange={handleChange}
        />

        <div className="mt-6">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
