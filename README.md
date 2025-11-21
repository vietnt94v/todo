# WMS - Warehouse Management System

Full-stack microfrontend application with Java backend and PostgreSQL database.

## Architecture

- **Database**: PostgreSQL with Liquibase migrations
- **Backend**: Java core (no framework) with JWT authentication
- **Frontend**: 
  - MFE Shell (React + Vite + Module Federation)
  - UMS Remote App (User Management System)
  - UI Components Library (shared components)

## Prerequisites

- PostgreSQL 12+
- Java 17+
- Maven 3.8+
- Node.js 18+
- pnpm 8+

## Setup Instructions

### 1. Database Setup

```bash
cd db

# Create database
psql -U postgres
CREATE DATABASE wms;
CREATE USER wms WITH PASSWORD 'wms';
GRANT ALL PRIVILEGES ON DATABASE wms TO wms;
\q

# Run migrations
liquibase update
```

Default users:
- `admin` / `admin@123` (Supervisor)
- `viet` / `x@123` (Supervisor)

### 2. Backend Setup

```bash
cd be

# Build
mvn clean package

# Run
mvn exec:java -Dexec.mainClass="com.wms.Main"

# Or run JAR
java -jar target/wms-backend-1.0.0.jar
```

Backend runs on: http://localhost:8080

### 3. Frontend Setup

#### UMS Remote App (must start first)

```bash
cd ui/ums
pnpm install
pnpm dev
```

UMS runs on: http://localhost:5174

#### MFE Shell App

```bash
cd ui/mfe
pnpm install
pnpm dev
```

MFE Shell runs on: http://localhost:5173

## Testing the Complete Flow

1. **Start all services** in this order:
   - PostgreSQL database
   - Java backend (port 8080)
   - UMS remote app (port 5174)
   - MFE shell app (port 5173)

2. **Access the application**:
   - Open browser: http://localhost:5173
   - You should be redirected to login page

3. **Login**:
   - Use credentials: `admin` / `admin@123`
   - Should redirect to home page

4. **Navigate to User Management**:
   - Click "User Management" in sidebar
   - Should load the UMS remote app via Module Federation
   - Should display table of users from backend

5. **Test features**:
   - Search users
   - View user details
   - Delete user (with confirmation)
   - Logout

## Project Structure

```
.
├── db/                     # Database migrations
│   ├── changelog/          # Liquibase SQL changesets
│   └── liquibase.properties
├── be/                     # Java backend
│   ├── src/main/java/com/wms/
│   │   ├── controller/     # HTTP controllers
│   │   ├── service/        # Business logic
│   │   ├── repository/     # Database access
│   │   ├── model/          # Data models
│   │   ├── util/           # Utilities (JWT, Password, DB)
│   │   └── server/         # HTTP server
│   └── pom.xml
├── ui/
│   ├── mfe/                # MFE shell app (host)
│   │   ├── src/
│   │   │   ├── components/layout/  # Header, Sidebar
│   │   │   ├── pages/              # Home, Login
│   │   │   ├── router/             # React Router
│   │   │   ├── store/              # Redux store
│   │   │   ├── services/           # API services
│   │   │   └── utils/              # Auth utilities
│   │   └── vite.config.ts          # Module Federation config
│   ├── ums/                # UMS remote app
│   │   ├── src/
│   │   │   ├── pages/              # UserManagement
│   │   │   ├── services/           # User API
│   │   │   └── types/              # TypeScript types
│   │   └── vite.config.ts          # Module Federation config
│   └── ui-components/      # Shared component library
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login (returns JWT token)

### Users (Protected)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Technologies Used

### Backend
- Java 17 (Core, no framework)
- PostgreSQL JDBC Driver
- jBCrypt (password hashing)
- java-jwt (JWT tokens)
- Gson (JSON serialization)
- JDK HTTP Server

### Frontend
- React 19
- TypeScript
- Vite
- Module Federation (@originjs/vite-plugin-federation)
- Redux Toolkit
- React Router v7
- Axios
- Tailwind CSS
- Lucide React (icons)
- js-cookie

### Database
- PostgreSQL
- Liquibase (migrations)

## Environment Variables

### Backend
Edit `be/src/main/resources/application.properties`

### Frontend
Create `.env` files (note: .env is gitignored):

**ui/mfe/.env**:
```
VITE_API_URL=http://localhost:8080/api
VITE_UMS_REMOTE_URL=http://localhost:5174/assets/remoteEntry.js
```

**ui/ums/.env**:
```
VITE_API_URL=http://localhost:8080/api
```

## Development Notes

- Module Federation requires the remote app (UMS) to be running before the host app (MFE Shell)
- JWT tokens are stored in cookies with 1-day expiration
- CORS is configured for both frontend ports (5173, 5174)
- All passwords are hashed with BCrypt (salt rounds: 10)

