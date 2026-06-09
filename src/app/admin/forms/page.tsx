'use client';

/**
 * Forms Management
 */

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import DataTable, { Column } from '@/components/admin/DataTable';

export default function FormsPage() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await fetch('/api/forms', { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        setForms(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch forms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this form?')) return;

    try {
      const response = await fetch(`/api/forms/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        fetchForms();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const columns: Column[] = [
    { key: 'name', label: 'Form Name' },
    { key: 'slug', label: 'Slug' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="p-8">
      <PageHeader
        title="Forms"
        description="Manage your website forms"
        actionLabel="Create Form"
        actionHref="/admin/forms/new"
      />
      <DataTable columns={columns} data={forms} onDelete={handleDelete} loading={loading} />
    </div>
  );
}
