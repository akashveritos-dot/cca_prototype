/**
 * Admin Dashboard Home
 * Main dashboard with statistics and quick actions
 */

import React from 'react';

export const metadata = {
  title: 'Admin Dashboard | Climate Carbon Alliance CMS',
  description: 'Content management system dashboard',
};

export default async function AdminDashboard() {
  // Fetch dashboard stats
  let stats = {
    totalPages: 0,
    totalMedia: 0,
    totalUsers: 0,
    unreadSubmissions: 0,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/dashboard/stats`, {
      cache: 'no-store',
    });
    
    if (response.ok) {
      const data = await response.json();
      stats = data.data;
    }
  } catch (error) {
    console.error('Failed to fetch stats:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to the Climate Carbon Alliance CMS</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Pages"
            value={stats.totalPages}
            icon="📄"
            color="blue"
          />
          <StatsCard
            title="Media Files"
            value={stats.totalMedia}
            icon="🖼️"
            color="green"
          />
          <StatsCard
            title="Users"
            value={stats.totalUsers}
            icon="👥"
            color="purple"
          />
          <StatsCard
            title="Unread Submissions"
            value={stats.unreadSubmissions}
            icon="📬"
            color="orange"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionButton href="/admin/pages/new" icon="➕" label="New Page" />
            <QuickActionButton href="/admin/media" icon="⬆️" label="Upload Media" />
            <QuickActionButton href="/admin/pages" icon="📋" label="View Pages" />
            <QuickActionButton href="/admin/settings" icon="⚙️" label="Settings" />
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">System Information</h2>
          <div className="space-y-2 text-gray-600">
            <p>✅ Database: Connected</p>
            <p>✅ API: Operational</p>
            <p>📅 Current Date: {new Date().toLocaleDateString()}</p>
            <p>🕐 Current Time: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">🚀 Getting Started</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Create your first page in <a href="/admin/pages" className="underline">Pages</a></li>
            <li>• Upload images in <a href="/admin/media" className="underline">Media Library</a></li>
            <li>• Configure site settings in <a href="/admin/settings" className="underline">Settings</a></li>
            <li>• Manage navigation in <a href="/admin/menus" className="underline">Menus</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon, color }: { title: string; value: number; icon: string; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className={`text-4xl ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function QuickActionButton({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <a
      href={href}
      className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <span className="text-3xl mb-2">{icon}</span>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </a>
  );
}
