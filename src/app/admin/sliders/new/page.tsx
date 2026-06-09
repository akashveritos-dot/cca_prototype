'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/admin/PageHeader';
import FormField from '@/components/admin/FormField';

export default function NewSliderPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    location: 'homepage',
    autoplay: true,
    autoplay_speed: 5000,
    show_arrows: true,
    show_dots: true,
    transition_effect: 'fade',
    status: 'active',
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/sliders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      if (response.ok) {
        router.push('/admin/sliders');
      } else {
        alert('Failed to create slider');
      }
    } catch (error) {
      alert('Failed to create slider');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <PageHeader title="Create New Slider" />

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <FormField
          label="Slider Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <FormField
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="autoplay"
              checked={form.autoplay}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Enable Autoplay</span>
          </label>
        </div>

        <FormField
          label="Autoplay Speed (ms)"
          name="autoplay_speed"
          type="number"
          value={form.autoplay_speed}
          onChange={handleChange}
        />

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="show_arrows"
              checked={form.show_arrows}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Show Navigation Arrows</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="show_dots"
              checked={form.show_dots}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Show Dots</span>
          </label>
        </div>

        <FormField
          label="Transition Effect"
          name="transition_effect"
          type="select"
          value={form.transition_effect}
          onChange={handleChange}
          options={[
            { value: 'fade', label: 'Fade' },
            { value: 'slide', label: 'Slide' },
            { value: 'zoom', label: 'Zoom' },
          ]}
        />

        <FormField
          label="Status"
          name="status"
          type="select"
          value={form.status}
          onChange={handleChange}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ]}
        />

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg"
          >
            {saving ? 'Creating...' : 'Create Slider'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
