'use client';

/**
 * Menus Management
 */

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import DataTable, { Column } from '@/components/admin/DataTable';

export default function MenusPage() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await fetch('/api/menus', { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        setMenus(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch menus:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this menu?')) return;

    try {
      const response = await fetch(`/api/menus/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        fetchMenus();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const columns: Column[] = [
    { key: 'name', label: 'Menu Name' },
    { key: 'location', label: 'Location' },
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
        title="Navigation Menus"
        description="Manage your website menus"
        actionLabel="Create Menu"
        actionHref="/admin/menus/new"
      />
      <DataTable columns={columns} data={menus} onDelete={handleDelete} loading={loading} />
    </div>
  );
}
