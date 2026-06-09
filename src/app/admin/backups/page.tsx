'use client';

/**
 * Backups Management
 */

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import DataTable, { Column } from '@/components/admin/DataTable';

interface Backup {
  id: number;
  filename: string;
  file_size: number;
  backup_type: string;
  status: string;
  created_at: string;
}

export default function BackupsPage() {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      // Mock data - implement /api/backups endpoint
      const mockBackups = [
        {
          id: 1,
          filename: 'backup-2026-06-09.sql',
          file_size: 1024000,
          backup_type: 'full',
          status: 'completed',
          created_at: new Date().toISOString(),
        },
      ];
      setBackups(mockBackups);
    } catch (error) {
      console.error('Failed to fetch backups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBackup = async () => {
    setCreating(true);
    try {
      // Implement backup creation
      alert('Backup creation started...');
      fetchBackups();
    } catch (error) {
      console.error('Failed to create backup:', error);
    } finally {
      setCreating(false);
    }
  };

  const columns: Column[] = [
    { key: 'filename', label: 'Filename' },
    {
      key: 'file_size',
      label: 'Size',
      render: (value) => `${(value / 1024 / 1024).toFixed(2)} MB`,
    },
    { key: 'backup_type', label: 'Type' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'completed'
              ? 'bg-green-100 text-green-800'
              : value === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      render: (value) => new Date(value).toLocaleString(),
    },
  ];

  return (
    <div className="p-8">
      <PageHeader
        title="Backups"
        description="Manage database backups"
        actionLabel={creating ? 'Creating...' : 'Create Backup'}
        onAction={handleCreateBackup}
      />
      
      <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          ⚠️ <strong>Important:</strong> Regular backups are essential for data protection. 
          Schedule automatic backups and store them in a secure location.
        </p>
      </div>

      <DataTable columns={columns} data={backups} loading={loading} />
    </div>
  );
}
