'use client';

/**
 * Roles Management
 */

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import DataTable, { Column } from '@/components/admin/DataTable';

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      // For now, fetch from a mock endpoint
      // You'll need to create /api/roles endpoint
      const mockRoles = [
        { id: 1, name: 'Super Admin', description: 'Full system access', status: 'active' },
        { id: 2, name: 'Admin', description: 'Administrative access', status: 'active' },
        { id: 3, name: 'Editor', description: 'Content management', status: 'active' },
        { id: 4, name: 'Author', description: 'Content creation', status: 'active' },
        { id: 5, name: 'Viewer', description: 'Read-only access', status: 'active' },
      ];
      setRoles(mockRoles);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column[] = [
    { key: 'name', label: 'Role Name' },
    { key: 'description', label: 'Description' },
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
        title="Roles & Permissions"
        description="Manage user roles and permissions"
        actionLabel="Create Role"
        actionHref="/admin/roles/new"
      />
      <DataTable columns={columns} data={roles} loading={loading} />
    </div>
  );
}
