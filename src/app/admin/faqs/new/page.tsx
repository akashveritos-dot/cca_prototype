'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/admin/PageHeader';
import FormField from '@/components/admin/FormField';

export default function NewFAQPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    question: '',
    answer: '',
    category: '',
    sort_order: 0,
    status: 'active',
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      if (response.ok) {
        router.push('/admin/faqs');
      } else {
        alert('Failed to create FAQ');
      }
    } catch (error) {
      alert('Failed to create FAQ');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <PageHeader title="Add New FAQ" />

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-3xl">
        <FormField
          label="Question"
          name="question"
          value={form.question}
          onChange={handleChange}
          required
        />

        <FormField
          label="Answer"
          name="answer"
          type="textarea"
          value={form.answer}
          onChange={handleChange}
          required
          rows={6}
        />

        <FormField
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
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
            {saving ? 'Creating...' : 'Create FAQ'}
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
