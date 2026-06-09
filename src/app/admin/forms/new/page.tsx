'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/admin/PageHeader';
import FormField from '@/components/admin/FormField';

export default function NewFormPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    submit_button_text: 'Submit',
    success_message: 'Thank you for your submission!',
    email_notification: true,
    status: 'active',
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === 'checkbox' ? checked : value 
    });

    if (name === 'name' && !form.slug) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      setForm(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/admin/forms/${data.data.id}`);
      } else {
        alert('Failed to create form');
      }
    } catch (error) {
      alert('Failed to create form');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <PageHeader title="Create New Form" />

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-3xl">
        <FormField
          label="Form Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <FormField
          label="Slug"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          required
          helpText="URL-friendly identifier"
        />

        <FormField
          label="Description"
          name="description"
          type="textarea"
          value={form.description}
          onChange={handleChange}
          rows={3}
        />

        <FormField
          label="Submit Button Text"
          name="submit_button_text"
          value={form.submit_button_text}
          onChange={handleChange}
        />

        <FormField
          label="Success Message"
          name="success_message"
          type="textarea"
          value={form.success_message}
          onChange={handleChange}
          rows={3}
        />

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="email_notification"
              checked={form.email_notification}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Enable Email Notifications</span>
          </label>
        </div>

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
            {saving ? 'Creating...' : 'Create Form'}
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
