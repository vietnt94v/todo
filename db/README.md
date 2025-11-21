# Database Setup

## Prerequisites
- PostgreSQL 12+
- Liquibase 4.20+

## Database Configuration
- **Database**: wms
- **Schema**: ums
- **Username**: wms
- **Password**: wms
- **Port**: 5432

## Setup Instructions

### 1. Create Database and User

```sql
CREATE DATABASE wms;
CREATE USER wms WITH PASSWORD 'wms';
GRANT ALL PRIVILEGES ON DATABASE wms TO wms;
```

### 2. Run Liquibase Migrations

```bash
cd db
liquibase update
```

Or run directly:

```bash
liquibase --changeLogFile=changelog/db.changelog-master.xml \
          --url=jdbc:postgresql://localhost:5432/wms \
          --username=wms \
          --password=wms \
          update
```

## Default Users

Two default users are created:
- **admin** / admin@123 (Supervisor role)
- **viet** / x@123 (Supervisor role)

## Schema Structure

### Tables
- `ums.user_status` - User account statuses
- `ums.users` - User accounts
- `ums.roles` - User roles (supervisor, operator, manager, client)
- `ums.permissions` - System permissions
- `ums.user_roles` - User-role associations
- `ums.role_permissions` - Role-permission associations

### Views
- `ums.user_view` - Combined view of users with their roles and permissions

## Permissions

- `user.create`, `user.read`, `user.update`, `user.delete` - User management
- `role.assign`, `role.manage` - Role management
- `system.admin`, `system.settings` - System administration
- `data.export`, `data.import` - Data operations

