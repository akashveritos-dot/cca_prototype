'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/admin/PageHeader';
import FormField from '@/components/admin/FormField';

export default function NewSectionPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    section_name: '',
    section_key: '',
    sort_order: 0,
    status: 'active',
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'section_name' && !form.section_key) {
      const key = value.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      setForm(prev => ({ ...prev, section_key: key }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      if (response.ok) {
        router.push('/admin/sections');
      } else {
        alert('Failed to create section');
      }
    } catch (error) {
      alert('Failed to create section');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <PageHeader title="Add New Section" />

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <FormField
          label="Section Name"
          name="section_name"
          value={form.section_name}
          onChange={handleChange}
          required
        />

        <FormField
          label="Section Key"
          name="section_key"
          value={form.section_key}
          onChange={handleChange}
          required
          helpText="Unique identifier for this section"
        />

        <FormField
          label="Sort Order"
          name="sort_order"
          type="number"
          value={form.sort_order}
          onChange={handleChange}
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
            {saving ? 'Creating...' : 'Create Section'}
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
