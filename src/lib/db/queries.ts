/**
 * Database query functions
 * Reusable database queries for the CMS
 */

import { query } from './mysql';
import type { Page, Media, Menu, MenuItem, Setting, User, PageSection, FAQ } from '@/types/database';

// =====================================================
// PAGE QUERIES
// =====================================================

export async function getAllPages() {
  return query<Page[]>('SELECT * FROM pages ORDER BY sort_order ASC');
}

export async function getPageBySlug(slug: string) {
  const pages = await query<Page[]>('SELECT * FROM pages WHERE slug = ? LIMIT 1', [slug]);
  return pages[0] || null;
}

export async function getPageById(id: number) {
  const pages = await query<Page[]>('SELECT * FROM pages WHERE id = ? LIMIT 1', [id]);
  return pages[0] || null;
}

export async function getPublishedPages() {
  return query<Page[]>('SELECT * FROM pages WHERE status = ? ORDER BY sort_order ASC', ['published']);
}

export async function getHomePage() {
  const pages = await query<Page[]>('SELECT * FROM pages WHERE is_home = ? LIMIT 1', [true]);
  return pages[0] || null;
}

export async function createPage(data: Partial<Page>) {
  const result = await query<any>(
    'INSERT INTO pages (title, slug, page_type, layout, status, created_by) VALUES (?, ?, ?, ?, ?, ?)',
    [data.title, data.slug, data.page_type || 'standard', data.layout || 'default', data.status || 'draft', data.created_by]
  );
  return result.insertId;
}

export async function updatePage(id: number, data: Partial<Page>) {
  return query(
    'UPDATE pages SET title = ?, slug = ?, status = ?, updated_by = ?, updated_at = NOW() WHERE id = ?',
    [data.title, data.slug, data.status, data.updated_by, id]
  );
}

export async function deletePage(id: number) {
  return query('DELETE FROM pages WHERE id = ?', [id]);
}

// =====================================================
// PAGE SECTIONS QUERIES
// =====================================================

export async function getPageSections(pageId: number) {
  return query<PageSection[]>(
    'SELECT * FROM page_sections WHERE page_id = ? AND status = ? ORDER BY sort_order ASC',
    [pageId, 'active']
  );
}

export async function createPageSection(data: Partial<PageSection>) {
  const result = await query<any>(
    'INSERT INTO page_sections (page_id, template_id, section_key, data, sort_order, status) VALUES (?, ?, ?, ?, ?, ?)',
    [data.page_id, data.template_id, data.section_key, JSON.stringify(data.data), data.sort_order || 0, data.status || 'active']
  );
  return result.insertId;
}

// =====================================================
// MEDIA QUERIES
// =====================================================

export async function getAllMedia(limit = 50, offset = 0) {
  return query<Media[]>(
    'SELECT * FROM media WHERE status = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
    ['active', limit, offset]
  );
}

export async function getMediaById(id: number) {
  const media = await query<Media[]>('SELECT * FROM media WHERE id = ? LIMIT 1', [id]);
  return media[0] || null;
}

export async function createMedia(data: Partial<Media>) {
  const result = await query<any>(
    `INSERT INTO media (filename, original_filename, file_path, file_url, file_type, mime_type, 
     file_size, width, height, alt_text, uploaded_by, folder, status) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.filename, data.original_filename, data.file_path, data.file_url, data.file_type,
      data.mime_type, data.file_size, data.width, data.height, data.alt_text,
      data.uploaded_by, data.folder || '/', data.status || 'active'
    ]
  );
  return result.insertId;
}

export async function deleteMedia(id: number) {
  return query('UPDATE media SET status = ? WHERE id = ?', ['inactive', id]);
}

// =====================================================
// MENU QUERIES
// =====================================================

export async function getMenuByLocation(location: string) {
  const menus = await query<Menu[]>('SELECT * FROM menus WHERE location = ? AND status = ? LIMIT 1', [location, 'active']);
  return menus[0] || null;
}

export async function getMenuItems(menuId: number) {
  return query<MenuItem[]>(
    'SELECT * FROM menu_items WHERE menu_id = ? AND status = ? ORDER BY sort_order ASC',
    [menuId, 'active']
  );
}

// =====================================================
// SETTINGS QUERIES
// =====================================================

export async function getAllSettings() {
  return query<Setting[]>('SELECT * FROM settings');
}

export async function getSettingByKey(key: string) {
  const settings = await query<Setting[]>('SELECT * FROM settings WHERE key_name = ? LIMIT 1', [key]);
  return settings[0] || null;
}

export async function getPublicSettings() {
  return query<Setting[]>('SELECT * FROM settings WHERE is_public = ?', [true]);
}

export async function updateSetting(key: string, value: string, userId?: number) {
  return query(
    'UPDATE settings SET key_value = ?, updated_by = ?, updated_at = NOW() WHERE key_name = ?',
    [value, userId, key]
  );
}

// =====================================================
// FAQ QUERIES
// =====================================================

export async function getAllFAQs() {
  return query<FAQ[]>('SELECT * FROM faqs WHERE status = ? ORDER BY sort_order ASC', ['active']);
}

export async function getFAQsByCategory(category: string) {
  return query<FAQ[]>(
    'SELECT * FROM faqs WHERE category = ? AND status = ? ORDER BY sort_order ASC',
    [category, 'active']
  );
}

// =====================================================
// USER QUERIES
// =====================================================

export async function getUserByEmail(email: string) {
  const users = await query<User[]>('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
  return users[0] || null;
}

export async function getUserById(id: number) {
  const users = await query<User[]>('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
  return users[0] || null;
}

export async function createUser(data: Partial<User>) {
  const result = await query<any>(
    'INSERT INTO users (email, password_hash, first_name, last_name, status) VALUES (?, ?, ?, ?, ?)',
    [data.email, data.password_hash, data.first_name, data.last_name, data.status || 'active']
  );
  return result.insertId;
}

export async function updateUserLogin(id: number) {
  return query(
    'UPDATE users SET last_login_at = NOW(), login_count = login_count + 1 WHERE id = ?',
    [id]
  );
}

// =====================================================
// STATISTICS QUERIES
// =====================================================

export async function getDashboardStats() {
  const [pages] = await query<any[]>('SELECT COUNT(*) as count FROM pages');
  const [media] = await query<any[]>('SELECT COUNT(*) as count FROM media WHERE status = ?', ['active']);
  const [users] = await query<any[]>('SELECT COUNT(*) as count FROM users WHERE status = ?', ['active']);
  const [submissions] = await query<any[]>('SELECT COUNT(*) as count FROM form_submissions WHERE status = ?', ['unread']);

  return {
    totalPages: pages.count,
    totalMedia: media.count,
    totalUsers: users.count,
    unreadSubmissions: submissions.count,
  };
}
