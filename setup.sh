#!/bin/bash

# =====================================================
# CMS Setup Script
# Climate Carbon Alliance - Automated Setup
# =====================================================

echo "🚀 Starting CMS Setup..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}❌ MySQL is not installed. Please install MySQL first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ MySQL found${NC}"

# Step 1: Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Install additional CMS dependencies
echo ""
echo "📦 Installing CMS-specific packages..."
npm install mysql2 @types/mysql2
npm install bcryptjs @types/bcryptjs
npm install next-auth
npm install @tanstack/react-query
npm install react-hook-form zod
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link
npm install date-fns
npm install sharp
npm install recharts
npm install react-dropzone
npm install react-sortablejs sortablejs
npm install @dnd-kit/core @dnd-kit/sortable
npm install react-hot-toast

echo -e "${GREEN}✅ Dependencies installed${NC}"

# Step 2: Create .env.local file
echo ""
echo "⚙️ Setting up environment variables..."

if [ -f .env.local ]; then
    echo -e "${YELLOW}⚠️  .env.local already exists. Skipping...${NC}"
else
    cp .env.example .env.local
    echo -e "${GREEN}✅ Created .env.local file${NC}"
    echo -e "${YELLOW}⚠️  Please update .env.local with your database credentials${NC}"
fi

# Step 3: Database setup
echo ""
echo "🗄️  Setting up database..."
echo "Please enter your MySQL credentials:"

read -p "MySQL Host [localhost]: " DB_HOST
DB_HOST=${DB_HOST:-localhost}

read -p "MySQL User [root]: " DB_USER
DB_USER=${DB_USER:-root}

read -s -p "MySQL Password: " DB_PASSWORD
echo ""

read -p "Database Name [climate_cms]: " DB_NAME
DB_NAME=${DB_NAME:-climate_cms}

# Update .env.local with database credentials
sed -i.bak "s/DB_HOST=.*/DB_HOST=$DB_HOST/" .env.local
sed -i.bak "s/DB_USER=.*/DB_USER=$DB_USER/" .env.local
sed -i.bak "s/DB_PASSWORD=.*/DB_PASSWORD=$DB_PASSWORD/" .env.local
sed -i.bak "s/DB_NAME=.*/DB_NAME=$DB_NAME/" .env.local
rm .env.local.bak

# Create database
echo ""
echo "Creating database..."
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database created successfully${NC}"
else
    echo -e "${RED}❌ Failed to create database${NC}"
    exit 1
fi

# Import schema
echo ""
echo "Importing database schema..."
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < schema.sql 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database schema imported successfully${NC}"
else
    echo -e "${RED}❌ Failed to import schema${NC}"
    exit 1
fi

# Step 4: Generate secrets
echo ""
echo "🔐 Generating security keys..."

NEXTAUTH_SECRET=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)

sed -i.bak "s/NEXTAUTH_SECRET=.*/NEXTAUTH_SECRET=$NEXTAUTH_SECRET/" .env.local
sed -i.bak "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env.local
rm .env.local.bak

echo -e "${GREEN}✅ Security keys generated${NC}"

# Step 5: Create upload directory
echo ""
echo "📁 Creating upload directory..."

mkdir -p public/uploads/{images,documents,videos}
chmod 755 public/uploads

echo -e "${GREEN}✅ Upload directory created${NC}"

# Step 6: Setup complete
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✨ Setup completed successfully!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Next steps:"
echo "1. Review and update .env.local file"
echo "2. Run 'npm run dev' to start development server"
echo "3. Visit http://localhost:3000/admin"
echo "4. Login with:"
echo "   Email: admin@example.com"
echo "   Password: admin123"
echo "5. ⚠️  IMPORTANT: Change the default admin password immediately!"
echo ""
echo "📚 Documentation:"
echo "- Implementation Plan: IMPLEMENTATION_PLAN.md"
echo "- Admin Guide: ADMIN_PANEL_GUIDE.md"
echo "- Database Schema: schema.sql"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
