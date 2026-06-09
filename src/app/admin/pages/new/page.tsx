'use client';

/**
 * Create New Page
 */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/admin/PageHeader';
import FormField from '@/components/admin/FormField';

export default function NewPagePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    page_type: 'standard',
    status: 'draft',
    layout: 'default',
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Auto-generate slug from title
    if (name === 'title' && !form.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setForm((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/admin/pages/${data.data.id}`);
      } else {
        alert('Failed to create page');
      }
    } catch (error) {
      console.error('Failed to create page:', error);
      alert('Failed to create page');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <PageHeader title="Create New Page" description="Add a new page to your website" />

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-3xl">
        <FormField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="About Us"
        />

        <FormField
          label="Slug"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          required
          placeholder="about-us"
          helpText="URL-friendly version of the title"
        />

        <FormField
          label="Page Type"
          name="page_type"
          type="select"
          value={form.page_type}
          onChange={handleChange}
          options={[
            { value: 'standard', label: 'Standard Page' },
            { value: 'homepage', label: 'Homepage' },
            { value: 'landing', label: 'Landing Page' },
            { value: 'custom', label: 'Custom' },
          ]}
        />

        <FormField
          label="Status"
          name="status"
          type="select"
          value={form.status}
          onChange={handleChange}
          options={[
            { value: 'draft', label: 'Draft' },
            { value: 'published', label: 'Published' },
            { value: 'archived', label: 'Archived' },
          ]}
        />

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium"
          >
            {saving ? 'Creating...' : 'Create Page'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
