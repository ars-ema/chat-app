# Chat App Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- A Neon database account

## Setup Steps

### 1. Install Dependencies
```bash
cd chat-app-main
npm install
```

### 2. Set up Neon Database
1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project
3. Copy your database connection string
4. Create a `.env.local` file in the root directory with:

```env
# Database
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"

# JWT Secret (generate a random string)
JWT_SECRET="your-super-secret-jwt-key-here"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"
```

### 3. Set up Database Schema
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

### 4. Clear Existing Data (Optional)
```bash
# This will clear all users and messages
npm run reset-db
```

### 5. Start Development Server
```bash
npm run dev
```

## Features
- ✅ User registration and login
- ✅ JWT authentication
- ✅ Real-time chat interface
- ✅ User management
- ✅ Message history
- ✅ Responsive design

## API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/users` - Get all users (requires auth)
- `GET /api/messages?receiverId=X` - Get messages with a user
- `POST /api/messages` - Send a message (requires auth)

## Troubleshooting
- Make sure your DATABASE_URL is correct
- Ensure all dependencies are installed
- Check that Prisma client is generated
- Verify JWT_SECRET is set
