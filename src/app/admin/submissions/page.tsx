'use client';

/**
 * Form Submissions
 */

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import DataTable, { Column } from '@/components/admin/DataTable';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/submissions', { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        setSubmissions(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this submission?')) return;

    try {
      const response = await fetch(`/api/submissions/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        fetchSubmissions();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const columns: Column[] = [
    { key: 'id', label: 'ID' },
    {
      key: 'data',
      label: 'Submission Data',
      render: (value) => (
        <div className="max-w-xs truncate">{JSON.stringify(value).substring(0, 50)}...</div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'unread'
              ? 'bg-yellow-100 text-yellow-800'
              : value === 'read'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Submitted',
      render: (value) => new Date(value).toLocaleString(),
    },
  ];

  return (
    <div className="p-8">
      <PageHeader title="Form Submissions" description="View and manage form submissions" />
      <DataTable columns={columns} data={submissions} onDelete={handleDelete} loading={loading} />
    </div>
  );
}
