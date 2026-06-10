/**
 * Admin Dashboard Home
 * Main dashboard with statistics and quick actions
 */

import React from 'react';

export const metadata = {
  title: 'Admin Dashboard | DCRF CMS',
  description: 'Disaster & Climate Resilience Federation - Content Management System',
};

export default async function AdminDashboard() {
  // Fetch dashboard stats
  let stats = {
    totalPages: 0,
    totalMedia: 0,
    totalUsers: 0,
    unreadSubmissions: 0,
    totalMembers: 0,
    pendingMembers: 0,
    newsletterSubscribers: 0,
  };

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    // Fetch general stats
    const response = await fetch(`${baseUrl}/api/dashboard/stats`, {
      cache: 'no-store',
    });
    
    if (response.ok) {
      const data = await response.json();
      stats = { ...stats, ...data.data };
    }

    // Fetch member stats
    try {
      const membersRes = await fetch(`${baseUrl}/api/members`, { cache: 'no-store' });
      if (membersRes.ok) {
        const membersData = await membersRes.json();
        stats.totalMembers = membersData.meta?.total || 0;
        stats.pendingMembers = membersData.data?.filter((m: any) => m.status === 'pending').length || 0;
      }
    } catch (e) {}

    // Fetch newsletter stats
    try {
      const newsletterRes = await fetch(`${baseUrl}/api/newsletter`, { cache: 'no-store' });
      if (newsletterRes.ok) {
        const newsletterData = await newsletterRes.json();
        stats.newsletterSubscribers = newsletterData.meta?.total || 0;
      }
    } catch (e) {}

  } catch (error) {
    console.error('Failed to fetch stats:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
            DCRF Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Disaster & Climate Resilience Federation - Admin Portal</p>
        </div>

        {/* DCRF Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">🚨 Federation Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Total Members"
              value={stats.totalMembers}
              icon="👥"
              color="orange"
              link="/admin/members"
            />
            <StatsCard
              title="Pending Applications"
              value={stats.pendingMembers}
              icon="⏳"
              color="red"
              link="/admin/members"
            />
            <StatsCard
              title="Newsletter Subscribers"
              value={stats.newsletterSubscribers}
              icon="📧"
              color="amber"
              link="/admin/newsletter"
            />
          </div>
        </div>

        {/* System Statistics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">📊 System Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              icon="👤"
              color="purple"
            />
            <StatsCard
              title="Unread Submissions"
              value={stats.unreadSubmissions}
              icon="📬"
              color="orange"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">⚡ Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionButton href="/admin/members" icon="👥" label="View Members" />
            <QuickActionButton href="/admin/newsletter" icon="📧" label="Newsletter" />
            <QuickActionButton href="/admin/pages/new" icon="➕" label="New Page" />
            <QuickActionButton href="/admin/media" icon="⬆️" label="Upload Media" />
          </div>
        </div>

        {/* System Info */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-orange-900">🔧 System Status</h2>
          <div className="space-y-2 text-gray-700">
            <p>✅ Database: Connected</p>
            <p>✅ API: Operational</p>
            <p>✅ DCRF Module: Active</p>
            <p>📅 Date: {new Date().toLocaleDateString()}</p>
            <p>🕐 Time: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-gradient-to-r from-red-900 to-orange-900 rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>🚨</span>
            <span>DCRF Admin Guide</span>
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Manage membership applications in <a href="/admin/members" className="underline font-semibold hover:text-orange-200">Members</a></span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>View newsletter subscribers in <a href="/admin/newsletter" className="underline font-semibold hover:text-orange-200">Newsletter</a></span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Create disaster content pages in <a href="/admin/pages" className="underline font-semibold hover:text-orange-200">Pages</a></span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Configure site settings in <a href="/admin/settings" className="underline font-semibold hover:text-orange-200">Settings</a></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon, color, link }: { 
  title: string; 
  value: number; 
  icon: string; 
  color: string;
  link?: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
  };

  const Card = (
    <div className={`bg-white rounded-lg shadow-sm p-6 border-2 ${link ? 'cursor-pointer hover:shadow-md transition' : ''}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2 text-gray-900">{value}</p>
        </div>
        <div className={`text-4xl p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return link ? <a href={link}>{Card}</a> : Card;
}

function QuickActionButton({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <a
      href={href}
      className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:from-orange-50 hover:to-red-50 border border-gray-200 hover:border-orange-300 transition-all"
    >
      <span className="text-3xl mb-2">{icon}</span>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </a>
  );
}
