'use client';

/**
 * Testimonials Management
 */

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import DataTable, { Column } from '@/components/admin/DataTable';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials', { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const columns: Column[] = [
    { key: 'name', label: 'Name' },
    { key: 'company', label: 'Company' },
    {
      key: 'rating',
      label: 'Rating',
      render: (value) => '⭐'.repeat(value),
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
        title="Testimonials"
        description="Manage customer testimonials"
        actionLabel="Add Testimonial"
        actionHref="/admin/testimonials/new"
      />
      <DataTable
        columns={columns}
        data={testimonials}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
}
