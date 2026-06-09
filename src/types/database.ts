/**
 * TypeScript types for database entities
 */

export type Status = 'active' | 'inactive';
export type UserStatus = 'active' | 'inactive' | 'suspended';
export type PageStatus = 'draft' | 'published' | 'archived';
export type FormSubmissionStatus = 'unread' | 'read' | 'processed' | 'spam';

// User types
export interface User {
  id: number;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  status: UserStatus;
  last_login_at?: Date;
  login_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface Role {
  id: number;
  name: string;
  description?: string;
  permissions: string[];
  status: Status;
  created_at: Date;
  updated_at: Date;
}

// Page types
export interface Page {
  id: number;
  title: string;
  slug: string;
  parent_id?: number;
  page_type: 'standard' | 'homepage' | 'custom' | 'landing';
  layout: string;
  template?: string;
  status: PageStatus;
  is_home: boolean;
  sort_order: number;
  featured_image_id?: number;
  created_by?: number;
  updated_by?: number;
  published_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface PageContent {
  id: number;
  page_id: number;
  section_key: string;
  content_type: 'text' | 'html' | 'markdown' | 'json';
  content: string;
  locale: string;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface SEOMetadata {
  id: number;
  entity_type: 'page' | 'news' | 'event' | 'custom';
  entity_id: number;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image_id?: number;
  og_type?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image_id?: number;
  canonical_url?: string;
  robots: string;
  schema_markup?: any;
  created_at: Date;
  updated_at: Date;
}

// Media types
export interface Media {
  id: number;
  filename: string;
  original_filename: string;
  file_path: string;
  file_url: string;
  file_type?: string;
  mime_type?: string;
  file_size?: number;
  width?: number;
  height?: number;
  alt_text?: string;
  caption?: string;
  title?: string;
  description?: string;
  folder: string;
  uploaded_by?: number;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

// Menu types
export interface Menu {
  id: number;
  name: string;
  location: string;
  description?: string;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

export interface MenuItem {
  id: number;
  menu_id: number;
  parent_id?: number;
  label: string;
  url?: string;
  page_id?: number;
  target: string;
  icon?: string;
  css_class?: string;
  sort_order: number;
  status: Status;
  created_at: Date;
  updated_at: Date;
  children?: MenuItem[];
}

// Section types
export interface SectionTemplate {
  id: number;
  name: string;
  component_name: string;
  description?: string;
  fields_schema?: any;
  thumbnail_url?: string;
  category?: string;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

export interface PageSection {
  id: number;
  page_id: number;
  template_id: number;
  section_name?: string;
  section_key: string;
  data?: any;
  sort_order: number;
  status: Status;
  created_at: Date;
  updated_at: Date;
  template?: SectionTemplate;
}

export interface SectionItem {
  id: number;
  section_id: number;
  title?: string;
  subtitle?: string;
  description?: string;
  image_id?: number;
  link_url?: string;
  link_text?: string;
  data?: any;
  sort_order: number;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

// Content module types
export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
  page_id?: number;
  sort_order: number;
  status: Status;
  created_by?: number;
  created_at: Date;
  updated_at: Date;
}

export interface Testimonial {
  id: number;
  name: string;
  position?: string;
  company?: string;
  content: string;
  avatar_id?: number;
  rating: number;
  sort_order: number;
  status: Status;
  created_by?: number;
  created_at: Date;
  updated_at: Date;
}

export interface Video {
  id: number;
  title: string;
  description?: string;
  video_url?: string;
  video_type: 'youtube' | 'vimeo' | 'upload' | 'embed';
  thumbnail_id?: number;
  duration?: number;
  category?: string;
  tags?: string[];
  sort_order: number;
  status: Status;
  created_by?: number;
  created_at: Date;
  updated_at: Date;
}

export interface Document {
  id: number;
  title: string;
  description?: string;
  file_id: number;
  category?: string;
  tags?: string[];
  download_count: number;
  sort_order: number;
  status: Status;
  created_by?: number;
  created_at: Date;
  updated_at: Date;
}

// Form types
export interface Form {
  id: number;
  name: string;
  slug: string;
  description?: string;
  submit_button_text: string;
  success_message?: string;
  error_message?: string;
  redirect_url?: string;
  email_notification: boolean;
  notification_emails?: string;
  status: Status;
  created_by?: number;
  created_at: Date;
  updated_at: Date;
}

export interface FormField {
  id: number;
  form_id: number;
  field_name: string;
  field_label: string;
  field_type: string;
  placeholder?: string;
  default_value?: string;
  options?: any;
  validation_rules?: any;
  is_required: boolean;
  sort_order: number;
  help_text?: string;
  css_class?: string;
  created_at: Date;
  updated_at: Date;
}

export interface FormSubmission {
  id: number;
  form_id: number;
  data: any;
  ip_address?: string;
  user_agent?: string;
  status: FormSubmissionStatus;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

// Settings type
export interface Setting {
  id: number;
  key_name: string;
  key_value?: string;
  data_type: 'string' | 'number' | 'boolean' | 'json' | 'text';
  category: string;
  description?: string;
  is_public: boolean;
  updated_by?: number;
  created_at: Date;
  updated_at: Date;
}

// Activity log types
export interface ActivityLog {
  id: number;
  user_id?: number;
  action: string;
  entity_type?: string;
  entity_id?: number;
  description?: string;
  ip_address?: string;
  user_agent?: string;
  metadata?: any;
  created_at: Date;
}

export interface AuditLog {
  id: number;
  user_id?: number;
  entity_type: string;
  entity_id: number;
  action: 'create' | 'update' | 'delete' | 'restore';
  old_values?: any;
  new_values?: any;
  changed_fields?: any;
  ip_address?: string;
  created_at: Date;
}

// Gallery types
export interface Gallery {
  id: number;
  title: string;
  description?: string;
  slug: string;
  category?: string;
  status: Status;
  created_by?: number;
  created_at: Date;
  updated_at: Date;
}

export interface Slider {
  id: number;
  name: string;
  location: string;
  autoplay: boolean;
  autoplay_speed: number;
  show_arrows: boolean;
  show_dots: boolean;
  transition_effect: string;
  status: Status;
  created_at: Date;
  updated_at: Date;
}
