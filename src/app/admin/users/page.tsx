'use client';

/**
 * Users Management
 */

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import DataTable, { Column } from '@/components/admin/DataTable';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users', { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this user?')) return;

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const columns: Column[] = [
    { key: 'id', label: 'ID' },
    { key: 'email', label: 'Email' },
    {
      key: 'first_name',
      label: 'Name',
      render: (_, row) => `${row.first_name} ${row.last_name}`,
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
    {
      key: 'last_login_at',
      label: 'Last Login',
      render: (value) => (value ? new Date(value).toLocaleDateString() : 'Never'),
    },
  ];

  return (
    <div className="p-8">
      <PageHeader
        title="Users"
        description="Manage user accounts"
        actionLabel="Add User"
        actionHref="/admin/users/new"
      />
      <DataTable columns={columns} data={users} onDelete={handleDelete} loading={loading} />
    </div>
  );
}
