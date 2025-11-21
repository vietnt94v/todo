--liquibase formatted sql

--changeset system:002-create-user-status-table
CREATE TABLE ums.user_status (
    id SERIAL PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--rollback DROP TABLE IF EXISTS ums.user_status CASCADE;

--changeset system:003-create-users-table
CREATE TABLE ums.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255),
    status_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_status FOREIGN KEY (status_id) REFERENCES ums.user_status(id)
);

CREATE INDEX idx_users_username ON ums.users(username);
CREATE INDEX idx_users_email ON ums.users(email);
CREATE INDEX idx_users_status ON ums.users(status_id);

--rollback DROP TABLE IF EXISTS ums.users CASCADE;

--changeset system:004-create-roles-table
CREATE TABLE ums.roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--rollback DROP TABLE IF EXISTS ums.roles CASCADE;

--changeset system:005-create-permissions-table
CREATE TABLE ums.permissions (
    id SERIAL PRIMARY KEY,
    permission_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--rollback DROP TABLE IF EXISTS ums.permissions CASCADE;

--changeset system:006-create-user-roles-table
CREATE TABLE ums.user_roles (
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES ums.users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES ums.roles(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_roles_user ON ums.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON ums.user_roles(role_id);

--rollback DROP TABLE IF EXISTS ums.user_roles CASCADE;

--changeset system:007-create-role-permissions-table
CREATE TABLE ums.role_permissions (
    role_id INTEGER NOT NULL,
    permission_id INTEGER NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (role_id, permission_id),
    CONSTRAINT fk_role_permissions_role FOREIGN KEY (role_id) REFERENCES ums.roles(id) ON DELETE CASCADE,
    CONSTRAINT fk_role_permissions_permission FOREIGN KEY (permission_id) REFERENCES ums.permissions(id) ON DELETE CASCADE
);

CREATE INDEX idx_role_permissions_role ON ums.role_permissions(role_id);
CREATE INDEX idx_role_permissions_permission ON ums.role_permissions(permission_id);

--rollback DROP TABLE IF EXISTS ums.role_permissions CASCADE;

