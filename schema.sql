-- =====================================================
-- COMPLETE CMS DATABASE SCHEMA FOR DYNAMIC WEBSITE
-- Climate Carbon Alliance - MySQL Database Schema
-- =====================================================

-- Drop existing tables if they exist (in reverse dependency order)
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS backups;
DROP TABLE IF EXISTS activity_logs;
DROP TABLE IF EXISTS form_submissions;
DROP TABLE IF EXISTS form_fields;
DROP TABLE IF EXISTS forms;
DROP TABLE IF EXISTS slider_items;
DROP TABLE IF EXISTS sliders;
DROP TABLE IF EXISTS gallery_items;
DROP TABLE IF EXISTS galleries;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS faqs;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS section_items;
DROP TABLE IF EXISTS page_sections;
DROP TABLE IF EXISTS section_templates;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS menus;
DROP TABLE IF EXISTS seo_metadata;
DROP TABLE IF EXISTS page_content;
DROP TABLE IF EXISTS pages;
DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

-- =====================================================
-- 1. USER MANAGEMENT TABLES
-- =====================================================

-- Roles table
CREATE TABLE roles (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    permissions JSON,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Users table
CREATE TABLE users (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url VARCHAR(500),
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    last_login_at TIMESTAMP NULL,
    login_count INT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User roles mapping (many-to-many)
CREATE TABLE user_roles (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_by INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY unique_user_role (user_id, role_id),
    INDEX idx_user (user_id),
    INDEX idx_role (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 2. SETTINGS & CONFIGURATION
-- =====================================================

CREATE TABLE settings (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    key_name VARCHAR(100) NOT NULL UNIQUE,
    key_value TEXT,
    data_type ENUM('string', 'number', 'boolean', 'json', 'text') DEFAULT 'string',
    category VARCHAR(50) DEFAULT 'general',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    updated_by INT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_category (category),
    INDEX idx_key (key_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 3. MEDIA MANAGEMENT
-- =====================================================

CREATE TABLE media (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_type VARCHAR(100),
    mime_type VARCHAR(100),
    file_size INT UNSIGNED,
    width INT UNSIGNED,
    height INT UNSIGNED,
    alt_text VARCHAR(255),
    caption TEXT,
    title VARCHAR(255),
    description TEXT,
    folder VARCHAR(255) DEFAULT '/',
    uploaded_by INT UNSIGNED,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_file_type (file_type),
    INDEX idx_folder (folder),
    INDEX idx_status (status),
    FULLTEXT idx_search (filename, alt_text, caption, title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 4. PAGE MANAGEMENT
-- =====================================================

CREATE TABLE pages (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    parent_id INT UNSIGNED NULL,
    page_type ENUM('standard', 'homepage', 'custom', 'landing') DEFAULT 'standard',
    layout VARCHAR(50) DEFAULT 'default',
    template VARCHAR(100),
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    is_home BOOLEAN DEFAULT FALSE,
    sort_order INT UNSIGNED DEFAULT 0,
    featured_image_id INT UNSIGNED,
    created_by INT UNSIGNED,
    updated_by INT UNSIGNED,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES pages(id) ON DELETE SET NULL,
    FOREIGN KEY (featured_image_id) REFERENCES media(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_parent (parent_id),
    INDEX idx_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Page content blocks
CREATE TABLE page_content (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    page_id INT UNSIGNED NOT NULL,
    section_key VARCHAR(100) NOT NULL,
    content_type ENUM('text', 'html', 'markdown', 'json') DEFAULT 'html',
    content LONGTEXT,
    locale VARCHAR(10) DEFAULT 'en',
    sort_order INT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE,
    INDEX idx_page (page_id),
    INDEX idx_section (section_key),
    INDEX idx_locale (locale)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- SEO Metadata
CREATE TABLE seo_metadata (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    entity_type ENUM('page', 'news', 'event', 'custom') NOT NULL,
    entity_id INT UNSIGNED NOT NULL,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    og_title VARCHAR(255),
    og_description TEXT,
    og_image_id INT UNSIGNED,
    og_type VARCHAR(50),
    twitter_card VARCHAR(50),
    twitter_title VARCHAR(255),
    twitter_description TEXT,
    twitter_image_id INT UNSIGNED,
    canonical_url VARCHAR(500),
    robots VARCHAR(100) DEFAULT 'index,follow',
    schema_markup JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (og_image_id) REFERENCES media(id) ON DELETE SET NULL,
    FOREIGN KEY (twitter_image_id) REFERENCES media(id) ON DELETE SET NULL,
    UNIQUE KEY unique_entity (entity_type, entity_id),
    INDEX idx_entity (entity_type, entity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 5. NAVIGATION MENUS
-- =====================================================

CREATE TABLE menus (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(50) NOT NULL,
    description TEXT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_location (location),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE menu_items (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    menu_id INT UNSIGNED NOT NULL,
    parent_id INT UNSIGNED NULL,
    label VARCHAR(255) NOT NULL,
    url VARCHAR(500),
    page_id INT UNSIGNED NULL,
    target VARCHAR(20) DEFAULT '_self',
    icon VARCHAR(100),
    css_class VARCHAR(255),
    sort_order INT UNSIGNED DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES menu_items(id) ON DELETE CASCADE,
    FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE SET NULL,
    INDEX idx_menu (menu_id),
    INDEX idx_parent (parent_id),
    INDEX idx_sort (sort_order),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 6. DYNAMIC SECTIONS & COMPONENTS
-- =====================================================

-- Section Templates (Hero, Cards, Testimonials, etc.)
CREATE TABLE section_templates (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    component_name VARCHAR(100) NOT NULL,
    description TEXT,
    fields_schema JSON,
    thumbnail_url VARCHAR(500),
    category VARCHAR(50),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Page Sections (Instances of templates)
CREATE TABLE page_sections (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    page_id INT UNSIGNED NOT NULL,
    template_id INT UNSIGNED NOT NULL,
    section_name VARCHAR(100),
    section_key VARCHAR(100) NOT NULL,
    data JSON,
    sort_order INT UNSIGNED DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE,
    FOREIGN KEY (template_id) REFERENCES section_templates(id) ON DELETE CASCADE,
    INDEX idx_page (page_id),
    INDEX idx_template (template_id),
    INDEX idx_sort (sort_order),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Section Items (for repeatable content like cards, list items)
CREATE TABLE section_items (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    section_id INT UNSIGNED NOT NULL,
    title VARCHAR(255),
    subtitle VARCHAR(255),
    description TEXT,
    image_id INT UNSIGNED,
    link_url VARCHAR(500),
    link_text VARCHAR(100),
    data JSON,
    sort_order INT UNSIGNED DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (section_id) REFERENCES page_sections(id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL,
    INDEX idx_section (section_id),
    INDEX idx_sort (sort_order),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 7. CONTENT MODULES
-- =====================================================

-- Videos
CREATE TABLE videos (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_url VARCHAR(500),
    video_type ENUM('youtube', 'vimeo', 'upload', 'embed') DEFAULT 'youtube',
    thumbnail_id INT UNSIGNED,
    duration INT UNSIGNED,
    category VARCHAR(50),
    tags JSON,
    sort_order INT UNSIGNED DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_by INT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (thumbnail_id) REFERENCES media(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Documents
CREATE TABLE documents (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_id INT UNSIGNED NOT NULL,
    category VARCHAR(50),
    tags JSON,
    download_count INT UNSIGNED DEFAULT 0,
    sort_order INT UNSIGNED DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_by INT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (file_id) REFERENCES media(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- FAQs
CREATE TABLE faqs (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(50),
    page_id INT UNSIGNED,
    sort_order INT UNSIGNED DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_by INT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_category (category),
    INDEX idx_page (page_id),
    INDEX idx_status (status),
    INDEX idx_sort (sort_order),
    FULLTEXT idx_search (question, answer)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Testimonials
CREATE TABLE testimonials (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255),
    company VARCHAR(255),
    content TEXT NOT NULL,
    avatar_id INT UNSIGNED,
    rating INT UNSIGNED DEFAULT 5,
    sort_order INT UNSIGNED DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_by INT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (avatar_id) REFERENCES media(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 8. GALLERIES & SLIDERS
-- =====================================================

-- Galleries
CREATE TABLE galleries (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(50),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_by INT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_category (category),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Gallery Items
CREATE TABLE gallery_items (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    gallery_id INT UNSIGNED NOT NULL,
    media_id INT UNSIGNED NOT NULL,
    title VARCHAR(255),
    description TEXT,
    sort_order INT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (gallery_id) REFERENCES galleries(id) ON DELETE CASCADE,
    FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE,
    INDEX idx_gallery (gallery_id),
    INDEX idx_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sliders
CREATE TABLE sliders (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(50) NOT NULL,
    autoplay BOOLEAN DEFAULT TRUE,
    autoplay_speed INT UNSIGNED DEFAULT 5000,
    show_arrows BOOLEAN DEFAULT TRUE,
    show_dots BOOLEAN DEFAULT TRUE,
    transition_effect VARCHAR(50) DEFAULT 'fade',
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_location (location),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Slider Items
CREATE TABLE slider_items (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    slider_id INT UNSIGNED NOT NULL,
    title VARCHAR(255),
    subtitle VARCHAR(255),
    description TEXT,
    image_id INT UNSIGNED NOT NULL,
    mobile_image_id INT UNSIGNED,
    link_url VARCHAR(500),
    link_text VARCHAR(100),
    button_style VARCHAR(50),
    text_position VARCHAR(50) DEFAULT 'center',
    overlay_opacity DECIMAL(3,2) DEFAULT 0.3,
    sort_order INT UNSIGNED DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (slider_id) REFERENCES sliders(id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE CASCADE,
    FOREIGN KEY (mobile_image_id) REFERENCES media(id) ON DELETE SET NULL,
    INDEX idx_slider (slider_id),
    INDEX idx_sort (sort_order),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 9. FORMS & SUBMISSIONS
-- =====================================================

-- Forms
CREATE TABLE forms (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    submit_button_text VARCHAR(100) DEFAULT 'Submit',
    success_message TEXT,
    error_message TEXT,
    redirect_url VARCHAR(500),
    email_notification BOOLEAN DEFAULT TRUE,
    notification_emails TEXT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_by INT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Form Fields
CREATE TABLE form_fields (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    form_id INT UNSIGNED NOT NULL,
    field_name VARCHAR(100) NOT NULL,
    field_label VARCHAR(255) NOT NULL,
    field_type VARCHAR(50) NOT NULL,
    placeholder VARCHAR(255),
    default_value TEXT,
    options JSON,
    validation_rules JSON,
    is_required BOOLEAN DEFAULT FALSE,
    sort_order INT UNSIGNED DEFAULT 0,
    help_text TEXT,
    css_class VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE,
    INDEX idx_form (form_id),
    INDEX idx_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Form Submissions
CREATE TABLE form_submissions (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    form_id INT UNSIGNED NOT NULL,
    data JSON NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    status ENUM('unread', 'read', 'processed', 'spam') DEFAULT 'unread',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE,
    INDEX idx_form (form_id),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 10. LOGGING & AUDIT TRAILS
-- =====================================================

-- Activity Logs
CREATE TABLE activity_logs (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id INT UNSIGNED,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_action (action),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Audit Logs (detailed change tracking)
CREATE TABLE audit_logs (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED,
    entity_type VARCHAR(50) NOT NULL,
    entity_id INT UNSIGNED NOT NULL,
    action ENUM('create', 'update', 'delete', 'restore') NOT NULL,
    old_values JSON,
    new_values JSON,
    changed_fields JSON,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_action (action),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 11. BACKUPS
-- =====================================================

CREATE TABLE backups (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT UNSIGNED,
    backup_type ENUM('full', 'incremental', 'manual') DEFAULT 'manual',
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    error_message TEXT,
    created_by INT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 12. INSERT DEFAULT DATA
-- =====================================================

-- Default Roles
INSERT INTO roles (name, description, permissions) VALUES
('Super Admin', 'Full system access', JSON_ARRAY('*')),
('Admin', 'Administrative access', JSON_ARRAY('pages', 'users', 'media', 'settings')),
('Editor', 'Content management access', JSON_ARRAY('pages', 'media', 'sections')),
('Author', 'Content creation access', JSON_ARRAY('pages.create', 'pages.update', 'media.upload')),
('Viewer', 'Read-only access', JSON_ARRAY('pages.view', 'media.view'));

-- Default Admin User (password: admin123 - CHANGE IN PRODUCTION!)
-- Password hash for 'admin123' using bcrypt
INSERT INTO users (email, password_hash, first_name, last_name, status) VALUES
('admin@example.com', '$2a$10$8ZMRJvvbUm3FpYOQYHiOhuZjz4XBVJhQfXvvUFZ4gTxB8K3Mq7Zzy', 'Admin', 'User', 'active');

-- Assign Super Admin role to default user
INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);

-- Default Settings
INSERT INTO settings (key_name, key_value, data_type, category, description, is_public) VALUES
('site_name', 'Climate Carbon Alliance', 'string', 'general', 'Website name', TRUE),
('site_tagline', 'Leading India\'s Carbon Market Transformation', 'string', 'general', 'Website tagline', TRUE),
('site_description', 'Official website of Climate Carbon Alliance', 'text', 'general', 'Site description', TRUE),
('site_logo', '', 'string', 'general', 'Logo media ID', TRUE),
('site_favicon', '', 'string', 'general', 'Favicon media ID', TRUE),
('contact_email', 'info@example.com', 'string', 'contact', 'Contact email', TRUE),
('contact_phone', '+91 1234567890', 'string', 'contact', 'Contact phone', TRUE),
('contact_address', 'New Delhi, India', 'text', 'contact', 'Contact address', TRUE),
('social_facebook', '', 'string', 'social', 'Facebook URL', TRUE),
('social_twitter', '', 'string', 'social', 'Twitter URL', TRUE),
('social_linkedin', '', 'string', 'social', 'LinkedIn URL', TRUE),
('social_instagram', '', 'string', 'social', 'Instagram URL', TRUE),
('social_youtube', '', 'string', 'social', 'YouTube URL', TRUE),
('footer_text', '© 2026 Climate Carbon Alliance. All rights reserved.', 'text', 'footer', 'Footer copyright text', TRUE),
('analytics_code', '', 'text', 'analytics', 'Google Analytics code', FALSE),
('maintenance_mode', 'false', 'boolean', 'system', 'Maintenance mode status', FALSE),
('items_per_page', '10', 'number', 'system', 'Default pagination', FALSE),
('date_format', 'Y-m-d', 'string', 'system', 'Date format', FALSE),
('time_format', 'H:i:s', 'string', 'system', 'Time format', FALSE),
('timezone', 'Asia/Kolkata', 'string', 'system', 'Default timezone', FALSE);

-- Default Menus
INSERT INTO menus (name, location, description) VALUES
('Main Navigation', 'header', 'Primary header navigation menu'),
('Footer Menu', 'footer', 'Footer navigation menu'),
('Mobile Menu', 'mobile', 'Mobile navigation menu');

-- Default Section Templates
INSERT INTO section_templates (name, component_name, description, category) VALUES
('Hero Banner', 'HeroSection', 'Full-width hero banner with image and text', 'hero'),
('Text Block', 'TextSection', 'Simple text content block', 'content'),
('Image Gallery', 'GallerySection', 'Image gallery with grid layout', 'media'),
('Card Grid', 'CardGrid', 'Grid of cards with images and text', 'content'),
('Testimonials', 'TestimonialsSection', 'Customer testimonials carousel', 'social-proof'),
('FAQ Section', 'FAQSection', 'Frequently asked questions accordion', 'content'),
('CTA Banner', 'CTASection', 'Call-to-action banner', 'conversion'),
('Video Section', 'VideoSection', 'Embedded video player', 'media'),
('Statistics', 'StatsSection', 'Animated statistics counters', 'data'),
('Team Grid', 'TeamSection', 'Team members grid', 'content');

-- =====================================================
-- END OF SCHEMA
-- =====================================================
