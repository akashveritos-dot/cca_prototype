# Admin Panel User Guide
## Climate Carbon Alliance CMS

---

## 🚀 Quick Start

### Accessing the Admin Panel

1. Navigate to: `http://yoursite.com/admin`
2. Login with your credentials
3. Default credentials (change immediately!):
   - Email: `admin@example.com`
   - Password: `admin123`

---

## 📊 Dashboard Overview

The dashboard is your control center with:

- **Statistics Cards**: Quick overview of content counts
- **Recent Activity**: Latest changes made by team members
- **Quick Actions**: Shortcuts to common tasks
- **System Status**: Health check of your website

---

## 📄 Page Management

### Creating a New Page

1. Go to **Admin > Pages > Create New**
2. Fill in page details:
   - **Title**: Page name (e.g., "About Us")
   - **Slug**: URL-friendly version (auto-generated)
   - **Status**: Draft, Published, or Archived
   - **Page Type**: Standard, Homepage, Landing, Custom
   - **Featured Image**: Optional banner image
3. Click **Save Draft** or **Publish**

### Editing Pages

1. Go to **Admin > Pages**
2. Click on the page you want to edit
3. Modify content using the rich text editor
4. Click **Update** to save changes

### Page Sections

Add dynamic sections to your pages:

1. In page editor, click **Add Section**
2. Choose from templates:
   - Hero Banner
   - Text Block
   - Card Grid
   - Image Gallery
   - Testimonials
   - FAQ
   - Video
   - Statistics
3. Configure section data
4. Drag to reorder sections
5. Toggle visibility with Active/Inactive

### SEO Settings

For each page, configure:

- **Meta Title**: Page title for search engines
- **Meta Description**: Brief description (150-160 chars)
- **Keywords**: Relevant search terms
- **Open Graph**: Social media preview
- **Twitter Card**: Twitter-specific preview
- **Schema Markup**: Structured data for Google

---

## 🖼️ Media Library

### Uploading Files

1. Go to **Admin > Media**
2. Click **Upload** or drag & drop files
3. Fill in metadata:
   - Alt Text (for accessibility)
   - Caption
   - Title
   - Description
4. Organize into folders

### Managing Media

- **Search**: Find files by name or metadata
- **Filter**: By type, date, or folder
- **Edit**: Update metadata
- **Delete**: Remove unused files
- **Bulk Actions**: Select multiple files

### Best Practices

- Use descriptive filenames
- Always add alt text for images
- Optimize images before upload
- Keep folders organized
- Delete unused media regularly

---

## 🧭 Navigation Menus

### Creating a Menu

1. Go to **Admin > Menus**
2. Click **Create New Menu**
3. Add menu items:
   - **Label**: Display text
   - **Link Type**: Page or Custom URL
   - **Icon**: Optional icon
   - **Target**: Same tab or new tab
4. Drag to reorder items
5. Create nested menus by dragging right

### Menu Locations

Assign menus to locations:
- Header Navigation
- Footer Menu
- Mobile Menu
- Sidebar Menu

---

## 📝 Content Modules

### FAQs

1. Go to **Admin > FAQs**
2. Click **Add New FAQ**
3. Enter question and answer
4. Assign to category
5. Link to specific page (optional)
6. Set display order

### Testimonials

1. Go to **Admin > Testimonials**
2. Click **Add New**
3. Fill in:
   - Name
   - Position & Company
   - Testimonial text
   - Avatar image
   - Rating (1-5 stars)
4. Set display order

### Videos

1. Go to **Admin > Videos**
2. Click **Add New Video**
3. Choose type:
   - YouTube (paste URL)
   - Vimeo (paste URL)
   - Upload (select file)
   - Embed (paste code)
4. Add title, description, category
5. Upload thumbnail

### Documents

1. Go to **Admin > Documents**
2. Click **Upload Document**
3. Select file (PDF, DOCX, etc.)
4. Add title and description
5. Categorize and tag
6. Publish

---

## 🎨 Galleries & Sliders

### Creating a Gallery

1. Go to **Admin > Galleries**
2. Click **Create Gallery**
3. Name the gallery
4. Add images:
   - Select from media library
   - Upload new images
   - Add captions
5. Configure layout options
6. Publish

### Creating a Slider

1. Go to **Admin > Sliders**
2. Click **Create Slider**
3. Add slides:
   - Upload slide images
   - Add title and description
   - Set link (optional)
   - Configure text position
4. Configure slider settings:
   - Autoplay speed
   - Transition effects
   - Navigation arrows
   - Dots/indicators
5. Assign to location

---

## 📋 Forms

### Building a Form

1. Go to **Admin > Forms**
2. Click **Create Form**
3. Add fields:
   - Text Input
   - Email
   - Phone
   - Textarea
   - Select/Dropdown
   - Checkbox
   - Radio Buttons
   - File Upload
4. Configure each field:
   - Label
   - Placeholder
   - Required/Optional
   - Validation rules
   - Help text
5. Set form settings:
   - Success message
   - Email notifications
   - Redirect URL
6. Get embed code

### Managing Submissions

1. Go to **Admin > Submissions**
2. View all form entries
3. Filter by:
   - Form
   - Status (Unread/Read/Processed)
   - Date range
4. Actions:
   - Mark as read
   - Add notes
   - Mark as spam
   - Export to CSV

---

## ⚙️ Settings

### General Settings

- Site Name
- Tagline
- Logo & Favicon
- Default Language
- Timezone
- Date/Time Format

### Contact Information

- Email Address
- Phone Number
- Physical Address
- Business Hours

### Social Media

- Facebook URL
- Twitter/X URL
- LinkedIn URL
- Instagram URL
- YouTube URL

### Footer Settings

- Copyright Text
- Footer Menu
- Additional Links
- Newsletter Signup

### Advanced Settings

- Maintenance Mode
- Analytics Code
- Custom CSS/JS
- Robots.txt
- Email SMTP Configuration

---

## 👥 User Management

### Adding Users

1. Go to **Admin > Users**
2. Click **Add New User**
3. Fill in:
   - Email (username)
   - First & Last Name
   - Password
   - Role
4. Set status (Active/Inactive)
5. Save

### User Roles

- **Super Admin**: Full access
- **Admin**: Manage content and users
- **Editor**: Manage content
- **Author**: Create and edit own content
- **Viewer**: Read-only access

### Managing Roles

1. Go to **Admin > Roles**
2. Edit role permissions:
   - Pages (view, create, edit, delete)
   - Media (upload, delete)
   - Users (manage)
   - Settings (modify)
3. Save changes

---

## 📈 Analytics & Reports

### Dashboard Statistics

- Total pages
- Total media files
- Total users
- Form submissions
- Recent activity

### Activity Logs

View detailed logs:
1. Go to **Admin > Activity Logs**
2. Filter by:
   - User
   - Action type
   - Date range
   - Entity type
3. Export logs

### Audit Trail

Track content changes:
1. Go to **Admin > Audit Logs**
2. See who changed what and when
3. View before/after values
4. Restore previous versions

---

## 💾 Backup & Restore

### Creating Backups

1. Go to **Admin > Backups**
2. Click **Create Backup**
3. Wait for completion
4. Download backup file

### Automatic Backups

Configure scheduled backups:
- Daily at specified time
- Weekly on specific day
- Monthly backups
- Retention policy

### Restoring Backups

1. Go to **Admin > Backups**
2. Select backup to restore
3. Click **Restore**
4. Confirm action
5. Wait for completion

⚠️ **Warning**: Restoring will overwrite current data!

---

## 🔍 Search & Filters

### Global Search

Use the search bar to find:
- Pages
- Media files
- Users
- FAQs
- Any content

### Advanced Filters

Filter content by:
- Status
- Date range
- Author
- Category
- Tags

### Saved Searches

Save frequently used search queries for quick access.

---

## 🔐 Security Best Practices

### Password Security

- Use strong passwords (min 12 characters)
- Mix uppercase, lowercase, numbers, symbols
- Change passwords regularly
- Never share credentials

### Two-Factor Authentication

1. Go to **Profile > Security**
2. Enable 2FA
3. Scan QR code with authenticator app
4. Save backup codes

### Session Management

- Logout when finished
- Enable "Remember Me" only on trusted devices
- Review active sessions regularly

---

## 🆘 Troubleshooting

### Common Issues

**Can't upload files**
- Check file size (max 10MB)
- Check file type is allowed
- Check disk space

**Page not saving**
- Check required fields are filled
- Check browser console for errors
- Try clearing browser cache

**Media not displaying**
- Check file permissions
- Verify file path is correct
- Check if file was deleted

**Login issues**
- Verify credentials are correct
- Clear browser cookies
- Reset password if needed

---

## 📞 Support

Need help? Contact:
- **Email**: support@example.com
- **Phone**: +91 1234567890
- **Documentation**: [Link to full docs]
- **Video Tutorials**: [Link to videos]

---

## 🎓 Training Resources

### Video Tutorials

- Getting Started with the Admin Panel
- Creating and Managing Pages
- Using the Media Library
- Building Forms
- SEO Best Practices

### Quick Reference Guides

- Keyboard shortcuts
- Common tasks checklist
- Content workflow diagram
- Approval process

---

## ✨ Tips & Tricks

1. **Use keyboard shortcuts** for faster navigation
2. **Save drafts frequently** to avoid losing work
3. **Preview before publishing** to catch errors
4. **Use categories and tags** for better organization
5. **Optimize images** before uploading
6. **Test forms** before making them live
7. **Check SEO scores** for each page
8. **Review analytics** regularly
9. **Keep content updated** and relevant
10. **Regular backups** are essential

---

**Happy Content Managing! 🎉**
