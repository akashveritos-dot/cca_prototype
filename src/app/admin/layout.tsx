/**
 * Admin Layout
 * Layout wrapper for all admin pages
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser, logout, User } from '@/lib/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Skip auth check on login page
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    // Fetch current user from server (checks HttpOnly cookie)
    getCurrentUser().then(userData => {
      if (!userData) {
        router.push('/admin/login');
        return;
      }
      setUser(userData);
      setLoading(false);
    });
  }, [pathname, router]);

  // Show loading on protected routes
  if (loading && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 border-b border-orange-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin" className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-3xl">🚨</span>
                <span>DCRF Admin</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <span className="text-sm text-orange-100">
                  👤 {user.first_name} {user.last_name}
                </span>
              )}
              <Link href="/" className="text-orange-100 hover:text-white transition">
                View Site
              </Link>
              <button 
                onClick={logout}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-medium transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar and Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            <SidebarLink href="/admin" icon="📊" label="Dashboard" />
            
            <div className="pt-4 pb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">DCRF Modules</p>
            </div>
            <SidebarLink href="/admin/members" icon="👥" label="Members" highlight />
            <SidebarLink href="/admin/newsletter" icon="📧" label="Newsletter" highlight />
            
            <div className="pt-4 pb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Content</p>
            </div>
            <SidebarLink href="/admin/pages" icon="📄" label="Pages" />
            <SidebarLink href="/admin/sections" icon="🧩" label="Sections" />
            <SidebarLink href="/admin/media" icon="🖼️" label="Media" />
            <SidebarLink href="/admin/menus" icon="🧭" label="Menus" />
            
            <div className="pt-4 pb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Modules</p>
            </div>
            <SidebarLink href="/admin/faqs" icon="❓" label="FAQs" />
            <SidebarLink href="/admin/testimonials" icon="💬" label="Testimonials" />
            <SidebarLink href="/admin/galleries" icon="🖼️" label="Galleries" />
            <SidebarLink href="/admin/sliders" icon="🎞️" label="Sliders" />
            <SidebarLink href="/admin/videos" icon="🎬" label="Videos" />
            <SidebarLink href="/admin/documents" icon="📁" label="Documents" />
            
            <div className="pt-4 pb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Forms</p>
            </div>
            <SidebarLink href="/admin/forms" icon="📋" label="Forms" />
            <SidebarLink href="/admin/submissions" icon="📬" label="Submissions" />
            
            <div className="pt-4 pb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">System</p>
            </div>
            <SidebarLink href="/admin/users" icon="👥" label="Users" />
            <SidebarLink href="/admin/roles" icon="🔐" label="Roles" />
            <SidebarLink href="/admin/settings" icon="⚙️" label="Settings" />
            <SidebarLink href="/admin/activity" icon="📝" label="Activity Logs" />
            <SidebarLink href="/admin/backups" icon="💾" label="Backups" />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ href, icon, label, highlight }: { href: string; icon: string; label: string; highlight?: boolean }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white'
          : highlight
          ? 'text-orange-400 hover:bg-gray-800 hover:text-orange-300'
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <span>{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
