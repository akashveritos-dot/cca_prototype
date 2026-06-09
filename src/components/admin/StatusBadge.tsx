/**
 * Reusable Status Badge Component
 */

import React from 'react';

interface StatusBadgeProps {
  status: string;
  colorMap?: Record<string, string>;
}

const defaultColorMap: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  published: 'bg-green-100 text-green-800',
  draft: 'bg-yellow-100 text-yellow-800',
  archived: 'bg-gray-100 text-gray-800',
  unread: 'bg-yellow-100 text-yellow-800',
  read: 'bg-blue-100 text-blue-800',
  processed: 'bg-green-100 text-green-800',
  spam: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
};

export default function StatusBadge({ status, colorMap }: StatusBadgeProps) {
  const colors = colorMap || defaultColorMap;
  const colorClass = colors[status] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  );
}
