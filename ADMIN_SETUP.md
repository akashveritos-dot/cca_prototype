# Admin Panel Setup Guide

## ✅ What's Been Built

### 🔐 Authentication System (Secure)
- **HttpOnly Cookies**: JWT tokens stored in secure HttpOnly cookies (XSS protection)
- **Rate Limiting**: Prevents brute force attacks (5 attempts per 15 minutes)
- **Middleware Protection**: All `/admin` routes protected automatically
- **Session Management**: Secure server-side session handling

### 📊 Admin Dashboard
- Statistics overview
- Quick action buttons
- System status
- Getting started guide

### 📄 Content Management
- **Pages**: Full CRUD operations
- **Sections**: Dynamic page sections
- **Media Library**: Upload, organize, and manage files
- **Menus**: Navigation menu builder

### 🎨 Content Modules
- **FAQs**: Frequently asked questions
- **Testimonials**: Customer testimonials with ratings
- **Videos**: YouTube, Vimeo, uploads, and embeds
- **Documents**: Downloadable files
- **Galleries**: Image galleries
- **Sliders**: Image carousels with settings

### 📋 Forms
- **Form Builder**: Create custom forms
- **Submissions**: View and manage form submissions
- **Email Notifications**: Automatic notification system

### 👥 User Management
- **Users**: Full user CRUD
- **Roles**: Role-based access control
- **Permissions**: Granular permission system

### ⚙️ System
- **Settings**: Site configuration
- **Activity Logs**: Track all actions
- **Audit Logs**: Detailed change tracking

---

## 🚀 Getting Started

### 1. Database Setup

First, run the schema to create all tables:

```bash
mysql -u root -p your_database < schema.sql
```

### 2. Environment Variables

Create `.env.local`:

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/database

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Node Environment
NODE_ENV=development
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Access Admin Panel

Navigate to: **http://localhost:3000/admin/login**

**Default Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

⚠️ **IMPORTANT**: Change the default password immediately!

---

## 🔒 Security Features

### 1. HttpOnly Cookies
- JWT tokens stored in HttpOnly cookies
- Cannot be accessed by JavaScript
- Protects against XSS attacks

### 2. CSRF Protection
- `sameSite: 'strict'` cookie attribute
- Prevents cross-site request forgery

### 3. Secure in Production
- Cookies set with `secure: true` in production (HTTPS only)
- Rate limiting on login attempts
- Password hashing with bcrypt

### 4. Middleware Protection
- All admin routes protected by middleware
- Token validation on every request
- Automatic redirect to login if unauthenticated

---

## 📁 File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx          # Login page
│   │   ├── page.tsx                # Dashboard
│   │   ├── layout.tsx              # Admin layout with nav
│   │   ├── settings/page.tsx       # Settings
│   │   ├── users/page.tsx          # User management
│   │   ├── pages/page.tsx          # Pages list
│   │   ├── pages/new/page.tsx      # Create page
│   │   ├── media/page.tsx          # Media library
│   │   ├── forms/page.tsx          # Forms
│   │   ├── submissions/page.tsx    # Form submissions
│   │   ├── faqs/page.tsx           # FAQs
│   │   ├── testimonials/page.tsx   # Testimonials
│   │   ├── videos/page.tsx         # Videos
│   │   ├── documents/page.tsx      # Documents
│   │   ├── galleries/page.tsx      # Galleries
│   │   ├── sliders/page.tsx        # Sliders
│   │   ├── menus/page.tsx          # Menus
│   │   ├── sections/page.tsx       # Sections
│   │   └── activity/page.tsx       # Activity logs
│   └── api/
│       └── auth/
│           ├── login/route.ts      # Login endpoint
│           ├── logout/route.ts     # Logout endpoint
│           └── me/route.ts         # Get current user
├── components/
│   └── admin/
│       ├── DataTable.tsx           # Reusable data table
│       ├── FormField.tsx           # Form field component
│       └── PageHeader.tsx          # Page header component
├── lib/
│   ├── auth.ts                     # Auth utilities
│   └── rate-limit.ts               # Rate limiter
└── middleware.ts                    # Route protection
```

---

## 🎨 Admin UI Components

### DataTable Component
Reusable table with sorting, actions, and loading states.

```tsx
<DataTable
  columns={columns}
  data={data}
  onEdit={handleEdit}
  onDelete={handleDelete}
  loading={loading}
/>
```

### FormField Component
Consistent form inputs with validation.

```tsx
<FormField
  label="Title"
  name="title"
  value={value}
  onChange={handleChange}
  required
/>
```

### PageHeader Component
Standard page header with actions.

```tsx
<PageHeader
  title="Users"
  description="Manage user accounts"
  actionLabel="Add User"
  actionHref="/admin/users/new"
/>
```

---

## 🔧 API Routes Status

### ✅ Implemented
- `/api/auth/login` - User login with JWT
- `/api/auth/logout` - User logout
- `/api/auth/me` - Get current user
- `/api/auth/register` - User registration

### 📝 Need Implementation
All other API routes need to be implemented to match the UI pages:
- `/api/pages` - CRUD operations for pages
- `/api/media` - Media management
- `/api/users` - User management
- `/api/settings` - Settings CRUD
- `/api/forms` - Forms CRUD
- `/api/submissions` - Submission management
- `/api/faqs` - FAQ CRUD
- `/api/testimonials` - Testimonials CRUD
- `/api/videos` - Videos CRUD
- `/api/documents` - Documents CRUD
- `/api/galleries` - Galleries CRUD
- `/api/sliders` - Sliders CRUD
- `/api/menus` - Menus CRUD
- `/api/sections` - Sections CRUD
- `/api/activity-logs` - Activity logs
- `/api/upload` - File upload handler

---

## 🚧 Next Steps

### 1. Implement Missing API Routes
The UI is ready, but you need to implement the backend API routes for each module.

### 2. Add Rich Text Editor
Install and integrate a WYSIWYG editor for page content:
```bash
npm install @tiptap/react @tiptap/starter-kit
```

### 3. Add Image Cropping
For better media management:
```bash
npm install react-image-crop
```

### 4. Add Drag & Drop
For reordering items and menu builder:
```bash
npm install @dnd-kit/core @dnd-kit/sortable
```

### 5. Add Search & Filters
Implement search functionality in each list view.

### 6. Add Pagination
Implement pagination for large datasets.

### 7. Add Bulk Actions
Select multiple items and perform bulk operations.

---

## 🔐 Changing Admin Password

### Option 1: Via Database
```sql
-- Generate new password hash
-- Use bcrypt with cost 10
UPDATE users 
SET password_hash = '$2a$10$newHashHere' 
WHERE email = 'admin@example.com';
```

### Option 2: Via Register API
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newadmin@example.com",
    "password": "NewSecurePassword123!",
    "first_name": "Admin",
    "last_name": "User"
  }'
```

---

## 📊 Database Tables

All tables created from `schema.sql`:
- `users`, `roles`, `user_roles`
- `pages`, `page_content`, `seo_metadata`
- `media`, `settings`
- `menus`, `menu_items`
- `section_templates`, `page_sections`, `section_items`
- `videos`, `documents`, `faqs`, `testimonials`
- `galleries`, `gallery_items`
- `sliders`, `slider_items`
- `forms`, `form_fields`, `form_submissions`
- `activity_logs`, `audit_logs`, `backups`

---

## 🐛 Troubleshooting

### Can't Login
- Check database connection
- Verify JWT_SECRET in .env.local
- Check user exists in database
- Clear browser cookies

### Pages Not Loading
- Check API routes exist
- Verify database tables created
- Check browser console for errors

### Middleware Redirecting
- Ensure cookies are enabled
- Check JWT_SECRET matches
- Verify token not expired

### Upload Not Working
- Check upload directory permissions
- Verify file size limits
- Check MIME types allowed

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [JWT Best Practices](https://jwt.io/introduction)
- [OWASP Security Guide](https://owasp.org)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

## 🤝 Support

For issues or questions:
1. Check this documentation
2. Review browser console errors
3. Check server logs
4. Verify database schema

---

**Built with ❤️ using Next.js 15, TypeScript, and MySQL**
