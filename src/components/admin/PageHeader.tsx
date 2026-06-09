/**
 * Admin Page Header Component
 */

import React from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function PageHeader({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-gray-600 mt-2">{description}</p>}
      </div>
      {actionLabel && (
        <div>
          {actionHref ? (
            <Link
              href={actionHref}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-block"
            >
              {actionLabel}
            </Link>
          ) : (
            <button
              onClick={onAction}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
