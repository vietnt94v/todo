# Quick Start Guide

## TL;DR - Start Everything

```bash
# Terminal 1 - Database (if not running)
sudo service postgresql start

# Terminal 2 - Backend
cd be
mvn exec:java -Dexec.mainClass="com.wms.Main"

# Terminal 3 - UMS Remote (MUST start before MFE)
cd ui/ums
pnpm dev

# Terminal 4 - MFE Shell
cd ui/mfe
pnpm dev
```

Then open: http://localhost:5173

Login: `admin` / `admin@123` or `viet` / `x@123`

## First Time Setup

### 1. Database (One time only)

```bash
# Login to PostgreSQL
psql -U postgres

# Run these commands
CREATE DATABASE wms;
CREATE USER wms WITH PASSWORD 'wms';
GRANT ALL PRIVILEGES ON DATABASE wms TO wms;
\q

# Run migrations
cd db
liquibase update
```

### 2. Build Backend (One time only)

```bash
cd be
mvn clean package
```

### 3. Install Frontend Dependencies (One time only)

```bash
# MFE Shell
cd ui/mfe
pnpm install

# UMS Remote
cd ui/ums
pnpm install
```

## What You'll Get

✅ **Database**: PostgreSQL with complete user management schema
✅ **Backend API**: Java REST API with JWT authentication
✅ **MFE Shell**: Main application with login, layout, routing
✅ **UMS Remote**: User Management System loaded via Module Federation
✅ **Features**: 
  - Login/Logout with JWT
  - Protected routes
  - User table with search
  - CRUD operations
  - Beautiful modern UI

## Architecture

```
┌─────────────┐
│  PostgreSQL │
└──────┬──────┘
       │
┌──────▼──────┐
│ Java Backend│ :8080
└──────┬──────┘
       │
       ├──────────────┬─────────────┐
       │              │             │
┌──────▼──────┐  ┌───▼────┐  ┌─────▼─────┐
│  MFE Shell  │  │  UMS   │  │    UI     │
│   :5173     │◄─┤ Remote │  │Components │
└─────────────┘  │ :5174  │  └───────────┘
                 └────────┘
```

## Testing

1. **Login Page**: Should redirect to `/login` when not authenticated
2. **Home Page**: Shows welcome message after login
3. **User Management**: Click sidebar → loads UMS remote app
4. **Search**: Type in search box to filter users
5. **Delete User**: Click trash icon (with confirmation)
6. **Logout**: Click logout icon in header

## Troubleshooting

**Backend won't start**: 
- Check if PostgreSQL is running
- Verify database `wms` exists
- Check port 8080 is free

**UMS won't load in MFE**:
- Make sure UMS is running on port 5174 FIRST
- Then start MFE on port 5173
- Check browser console for Module Federation errors

**Login fails**:
- Backend must be running on port 8080
- Check database has seed data (run liquibase update)
- Try default credentials: `admin` / `admin@123`

**CORS errors**:
- Backend CORS is configured for ports 5173 and 5174
- Make sure you're accessing the correct URLs

## Default Password Hashes

The seed data includes BCrypt hashed passwords:
- `admin@123` → hash stored in database
- `x@123` → hash stored in database

Note: The hashes in the seed data are pre-computed BCrypt hashes.

