'use client';

/**
 * Sliders Management
 */

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import DataTable, { Column } from '@/components/admin/DataTable';

export default function SlidersPage() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const response = await fetch('/api/sliders', { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        setSliders(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch sliders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this slider?')) return;

    try {
      const response = await fetch(`/api/sliders/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        fetchSliders();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const columns: Column[] = [
    { key: 'name', label: 'Name' },
    { key: 'location', label: 'Location' },
    {
      key: 'autoplay',
      label: 'Autoplay',
      render: (value) => (value ? '✓' : '✗'),
    },
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
        title="Sliders"
        description="Manage your image sliders"
        actionLabel="Create Slider"
        actionHref="/admin/sliders/new"
      />
      <DataTable columns={columns} data={sliders} onDelete={handleDelete} loading={loading} />
    </div>
  );
}
