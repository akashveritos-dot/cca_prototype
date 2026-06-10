-- =====================================================
-- COMPLETE CMS DATABASE SCHEMA FOR DYNAMIC WEBSITE
-- Disaster & Climate Resilience Federation (DCRF) - MySQL Database Schema
-- =====================================================

-- Drop existing tables if they exist (in reverse dependency order)
DROP TABLE IF EXISTS newsletter_subscriptions;
DROP TABLE IF EXISTS india_state_risks;
DROP TABLE IF EXISTS disaster_data;
DROP TABLE IF EXISTS news_articles;
DROP TABLE IF EXISTS partners;
DROP TABLE IF EXISTS awards;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS working_groups;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS leadership;
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


-- =====================================================
-- 13. DCRF-SPECIFIC TABLES (DISASTER & CLIMATE RESILIENCE FEDERATION)
-- =====================================================

-- Members (Federation Membership)
CREATE TABLE members (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    organization_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    tier ENUM('founding', 'institutional', 'corporate', 'individual', 'student') NOT NULL,
    description TEXT,
    logo_id INT UNSIGNED,
    website VARCHAR(500),
    industry VARCHAR(100),
    location VARCHAR(255),
    joined_date DATE,
    expiry_date DATE,
    status ENUM('pending', 'active', 'inactive', 'suspended', 'expired') DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'overdue') DEFAULT 'pending',
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (logo_id) REFERENCES media(id) ON DELETE SET NULL,
    INDEX idx_tier (tier),
    INDEX idx_status (status),
    INDEX idx_email (email),
    INDEX idx_payment_status (payment_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Working Groups
CREATE TABLE working_groups (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    focus_areas JSON,
    chair_person VARCHAR(255),
    co_chair VARCHAR(255),
    members_count INT UNSIGNED DEFAULT 0,
    icon VARCHAR(100),
    color VARCHAR(50),
    status ENUM('active', 'inactive') DEFAULT 'active',
    sort_order INT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Events (Annual Conferences)
CREATE TABLE events (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    tagline VARCHAR(500),
    description TEXT,
    event_type ENUM('conference', 'workshop', 'webinar', 'masterclass', 'networking') DEFAULT 'conference',
    start_date DATE NOT NULL,
    end_date DATE,
    venue VARCHAR(500),
    city VARCHAR(100),
    is_hybrid BOOLEAN DEFAULT TRUE,
    virtual_link VARCHAR(500),
    registration_link VARCHAR(500),
    banner_image_id INT UNSIGNED,
    agenda JSON,
    sponsors JSON,
    speakers JSON,
    attendee_count INT UNSIGNED DEFAULT 0,
    registration_fee DECIMAL(10, 2),
    status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
    featured BOOLEAN DEFAULT FALSE,
    metadata JSON,
    created_by INT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (banner_image_id) REFERENCES media(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_start_date (start_date),
    INDEX idx_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Awards (Recognition Categories)
CREATE TABLE awards (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    event_id INT UNSIGNED,
    category VARCHAR(255) NOT NULL,
    description TEXT,
    criteria TEXT,
    nomination_deadline DATE,
    winner_organization VARCHAR(255),
    winner_contact VARCHAR(255),
    winner_description TEXT,
    winner_logo_id INT UNSIGNED,
    year INT UNSIGNED NOT NULL,
    status ENUM('open', 'closed', 'announced') DEFAULT 'open',
    sort_order INT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE SET NULL,
    FOREIGN KEY (winner_logo_id) REFERENCES media(id) ON DELETE SET NULL,
    INDEX idx_event (event_id),
    INDEX idx_year (year),
    INDEX idx_status (status),
    INDEX idx_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Partners (Corporate & Organizational Partners)
CREATE TABLE partners (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    tier ENUM('platinum', 'gold', 'silver', 'bronze', 'knowledge', 'supporting') NOT NULL,
    logo_id INT UNSIGNED NOT NULL,
    website VARCHAR(500),
    industry VARCHAR(100),
    partnership_start_date DATE,
    partnership_end_date DATE,
    contribution_areas JSON,
    featured BOOLEAN DEFAULT FALSE,
    sort_order INT UNSIGNED DEFAULT 0,
    status ENUM('active', 'inactive', 'expired') DEFAULT 'active',
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (logo_id) REFERENCES media(id) ON DELETE CASCADE,
    INDEX idx_slug (slug),
    INDEX idx_tier (tier),
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- News Articles (disastersnews.com)
CREATE TABLE news_articles (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    category ENUM('disasters', 'climate-action', 'environment', 'disaster-tech', 'space-applications') NOT NULL,
    subcategory VARCHAR(100),
    featured_image_id INT UNSIGNED,
    author_name VARCHAR(255),
    author_id INT UNSIGNED,
    reading_time INT UNSIGNED,
    tags JSON,
    location VARCHAR(255),
    severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    is_featured BOOLEAN DEFAULT FALSE,
    is_breaking BOOLEAN DEFAULT FALSE,
    views_count INT UNSIGNED DEFAULT 0,
    shares_count INT UNSIGNED DEFAULT 0,
    published_at TIMESTAMP NULL,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_by INT UNSIGNED,
    updated_by INT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (featured_image_id) REFERENCES media(id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_published (published_at),
    INDEX idx_featured (is_featured),
    INDEX idx_breaking (is_breaking),
    INDEX idx_severity (severity),
    FULLTEXT idx_search (title, excerpt, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Disaster Data (For Visualizations & Statistics)
CREATE TABLE disaster_data (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    data_type ENUM('disaster_event', 'risk_assessment', 'climate_indicator', 'economic_loss', 'demographic') NOT NULL,
    year INT UNSIGNED,
    month INT UNSIGNED,
    state VARCHAR(100),
    district VARCHAR(100),
    disaster_type VARCHAR(100),
    metric_name VARCHAR(255) NOT NULL,
    metric_value DECIMAL(20, 4),
    metric_unit VARCHAR(50),
    affected_population INT UNSIGNED,
    economic_loss_inr DECIMAL(20, 2),
    fatalities INT UNSIGNED,
    metadata JSON,
    source VARCHAR(500),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_data_type (data_type),
    INDEX idx_year (year),
    INDEX idx_state (state),
    INDEX idx_disaster_type (disaster_type),
    INDEX idx_verified (verified)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- India States Risk Profile (For Map Visualization)
CREATE TABLE india_state_risks (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    state_code VARCHAR(10) NOT NULL UNIQUE,
    state_name VARCHAR(100) NOT NULL,
    composite_risk_score DECIMAL(5, 2),
    flood_risk DECIMAL(5, 2),
    cyclone_risk DECIMAL(5, 2),
    earthquake_risk DECIMAL(5, 2),
    drought_risk DECIMAL(5, 2),
    heatwave_risk DECIMAL(5, 2),
    landslide_risk DECIMAL(5, 2),
    population INT UNSIGNED,
    vulnerable_population INT UNSIGNED,
    disaster_count_5y INT UNSIGNED,
    economic_loss_5y_inr DECIMAL(20, 2),
    preparedness_index DECIMAL(5, 2),
    resilience_index DECIMAL(5, 2),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_state_code (state_code),
    INDEX idx_composite_risk (composite_risk_score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Leadership & Governance
CREATE TABLE leadership (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    role_type ENUM('steering_committee', 'advisory_board', 'working_group_chair', 'founding_member') NOT NULL,
    bio TEXT,
    photo_id INT UNSIGNED,
    linkedin_url VARCHAR(500),
    email VARCHAR(255),
    sort_order INT UNSIGNED DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (photo_id) REFERENCES media(id) ON DELETE SET NULL,
    INDEX idx_role_type (role_type),
    INDEX idx_status (status),
    INDEX idx_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Newsletter Subscriptions
CREATE TABLE newsletter_subscriptions (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    organization VARCHAR(255),
    interests JSON,
    status ENUM('subscribed', 'unsubscribed', 'bounced') DEFAULT 'subscribed',
    verification_token VARCHAR(255),
    verified_at TIMESTAMP NULL,
    unsubscribed_at TIMESTAMP NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_verified (verified_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- INSERT DEFAULT DCRF DATA
-- =====================================================

-- Update site settings for DCRF
UPDATE settings SET key_value = 'Disaster & Climate Resilience Federation' WHERE key_name = 'site_name';
UPDATE settings SET key_value = 'Uniting India for Disaster Resilience & Climate Action' WHERE key_name = 'site_tagline';
UPDATE settings SET key_value = 'A joint-venture federation of TCU Impact Foundation and DiCAF, advancing disaster preparedness, climate resilience and sustainable development across India.' WHERE key_name = 'site_description';
UPDATE settings SET key_value = '© 2026 Disaster & Climate Resilience Federation. A joint venture of TCUIF and DiCAF. All rights reserved.' WHERE key_name = 'footer_text';

-- Default Working Groups
INSERT INTO working_groups (name, slug, description, icon, color, sort_order) VALUES
('Risk Assessment & Early Warning', 'risk-assessment', 'Developing comprehensive risk assessment frameworks and early warning systems for disaster preparedness.', 'alert-triangle', '#dc2626', 1),
('Climate Adaptation & Resilience', 'climate-adaptation', 'Building climate-resilient communities and infrastructure through adaptation strategies.', 'waves', '#ea580c', 2),
('Disaster Technology & Innovation', 'disaster-tech', 'Leveraging technology, AI, and geospatial tools for disaster management and response.', 'satellite', '#3b82f6', 3),
('Capacity Building & Training', 'capacity-building', 'Strengthening institutional and community capacity for disaster preparedness and response.', 'users', '#f59e0b', 4),
('Climate Finance & Investment', 'climate-finance', 'Mobilizing financial resources and investment for climate resilience and disaster risk reduction.', 'trending-up', '#10b981', 5),
('Post-Disaster Recovery & Reconstruction', 'recovery', 'Facilitating effective post-disaster recovery, rehabilitation, and reconstruction efforts.', 'refresh-cw', '#8b5cf6', 6);

-- Default Award Categories
INSERT INTO awards (category, description, criteria, year, status, sort_order) VALUES
('Best Corporate Disaster Response', 'Recognizing corporate excellence in disaster response and community support during emergencies.', 'Impact, innovation, scalability, and sustainability of disaster response initiatives.', YEAR(CURDATE()), 'open', 1),
('Best NGO Initiative', 'Honoring NGOs demonstrating outstanding disaster preparedness and community resilience programs.', 'Community impact, innovation, and long-term sustainability of programs.', YEAR(CURDATE()), 'open', 2),
('Climate Resilient Community', 'Celebrating communities showing exemplary climate adaptation and resilience practices.', 'Community participation, measurable outcomes, and replicability.', YEAR(CURDATE()), 'open', 3),
('Disaster-Tech Innovator', 'Recognizing breakthrough technological solutions in disaster management and climate resilience.', 'Innovation, scalability, effectiveness, and adoption potential.', YEAR(CURDATE()), 'open', 4),
('Lifetime Achievement', 'Honoring individuals with sustained contributions to disaster management and climate action.', 'Career-long impact, leadership, and influence in the field.', YEAR(CURDATE()), 'open', 5);

-- Sample India State Risk Data (Top 15 states)
INSERT INTO india_state_risks (state_code, state_name, composite_risk_score, flood_risk, cyclone_risk, earthquake_risk, drought_risk, heatwave_risk, landslide_risk, population, disaster_count_5y) VALUES
('AS', 'Assam', 8.5, 9.2, 2.1, 8.8, 3.2, 4.5, 7.5, 35607039, 85),
('BR', 'Bihar', 8.2, 9.5, 0.5, 7.8, 5.5, 7.2, 2.0, 124799926, 102),
('OD', 'Odisha', 8.8, 8.5, 9.8, 3.2, 6.5, 6.8, 4.2, 46356334, 125),
('WB', 'West Bengal', 8.0, 8.8, 7.5, 6.5, 4.2, 5.5, 3.5, 99609303, 98),
('UP', 'Uttar Pradesh', 7.5, 8.2, 0.2, 4.5, 6.8, 8.5, 2.5, 237882725, 145),
('MH', 'Maharashtra', 7.2, 7.5, 5.5, 5.8, 7.2, 7.5, 4.8, 123144223, 112),
('GJ', 'Gujarat', 7.8, 6.5, 8.2, 6.2, 7.8, 8.2, 2.0, 63872399, 95),
('KL', 'Kerala', 7.0, 8.8, 2.5, 1.5, 2.8, 4.2, 8.5, 35699443, 88),
('TN', 'Tamil Nadu', 7.5, 7.2, 8.5, 2.2, 6.5, 8.8, 3.0, 77841267, 105),
('UK', 'Uttarakhand', 8.5, 8.5, 0.0, 9.5, 3.5, 5.2, 9.0, 11250858, 72),
('HP', 'Himachal Pradesh', 8.0, 7.5, 0.0, 9.0, 4.0, 5.5, 8.8, 7451955, 65),
('JK', 'Jammu & Kashmir', 8.2, 7.8, 0.0, 9.2, 4.5, 5.0, 8.5, 13635000, 58),
('RJ', 'Rajasthan', 6.8, 5.5, 0.0, 3.5, 8.5, 9.0, 1.5, 81032689, 82),
('MP', 'Madhya Pradesh', 6.5, 6.8, 0.0, 4.0, 7.5, 8.2, 3.0, 85358965, 78),
('AP', 'Andhra Pradesh', 7.2, 7.0, 8.0, 2.5, 6.8, 7.8, 2.8, 53903393, 92);

-- =====================================================
-- END OF COMPLETE UNIFIED SCHEMA
-- =====================================================
