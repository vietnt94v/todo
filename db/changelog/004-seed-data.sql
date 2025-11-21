--liquibase formatted sql

--changeset system:009-seed-user-statuses
INSERT INTO ums.user_status (status_name, description) VALUES
('active', 'User account is active and can login'),
('inactive', 'User account is inactive'),
('locked', 'User account is locked due to security reasons'),
('pending', 'User account is pending approval');

--rollback DELETE FROM ums.user_status WHERE status_name IN ('active', 'inactive', 'locked', 'pending');

--changeset system:010-seed-roles
INSERT INTO ums.roles (role_name, description) VALUES
('supervisor', 'Supervisor with full access to all features'),
('operator', 'Operator with limited operational access'),
('manager', 'Manager with administrative access'),
('client', 'Client with read-only access');

--rollback DELETE FROM ums.roles WHERE role_name IN ('supervisor', 'operator', 'manager', 'client');

--changeset system:011-seed-permissions
INSERT INTO ums.permissions (permission_name, description) VALUES
('user.create', 'Create new users'),
('user.read', 'View user information'),
('user.update', 'Update user information'),
('user.delete', 'Delete users'),
('role.assign', 'Assign roles to users'),
('role.manage', 'Manage roles and their permissions'),
('system.admin', 'Full system administration access'),
('system.settings', 'Access system settings'),
('data.export', 'Export data from the system'),
('data.import', 'Import data into the system');

--rollback DELETE FROM ums.permissions WHERE permission_name IN ('user.create', 'user.read', 'user.update', 'user.delete', 'role.assign', 'role.manage', 'system.admin', 'system.settings', 'data.export', 'data.import');

--changeset system:012-assign-supervisor-permissions
INSERT INTO ums.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM ums.roles r
CROSS JOIN ums.permissions p
WHERE r.role_name = 'supervisor';

--rollback DELETE FROM ums.role_permissions WHERE role_id = (SELECT id FROM ums.roles WHERE role_name = 'supervisor');

--changeset system:013-assign-manager-permissions
INSERT INTO ums.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM ums.roles r
CROSS JOIN ums.permissions p
WHERE r.role_name = 'manager'
AND p.permission_name IN ('user.read', 'user.update', 'role.assign', 'data.export', 'data.import');

--rollback DELETE FROM ums.role_permissions WHERE role_id = (SELECT id FROM ums.roles WHERE role_name = 'manager');

--changeset system:014-assign-operator-permissions
INSERT INTO ums.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM ums.roles r
CROSS JOIN ums.permissions p
WHERE r.role_name = 'operator'
AND p.permission_name IN ('user.read', 'data.export');

--rollback DELETE FROM ums.role_permissions WHERE role_id = (SELECT id FROM ums.roles WHERE role_name = 'operator');

--changeset system:015-assign-client-permissions
INSERT INTO ums.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM ums.roles r
CROSS JOIN ums.permissions p
WHERE r.role_name = 'client'
AND p.permission_name = 'user.read';

--rollback DELETE FROM ums.role_permissions WHERE role_id = (SELECT id FROM ums.roles WHERE role_name = 'client');

--changeset system:016-create-default-users
INSERT INTO ums.users (username, password_hash, email, full_name, status_id) VALUES
('admin', '$2a$10$rZL3Kq0oJHxhXqJQj7K3ue8B5VqE6XZwH7O1g2HZzVx0J0Yz8y6f2', 'admin@wms.com', 'Administrator', (SELECT id FROM ums.user_status WHERE status_name = 'active')),
('viet', '$2a$10$YpW8K3dJ7H1xXqZQj8K4ue9C6VrF7YAwI8P2h3IZAWy1K1ZA9z7g3', 'viet@wms.com', 'Viet Nguyen', (SELECT id FROM ums.user_status WHERE status_name = 'active'));

--rollback DELETE FROM ums.users WHERE username IN ('admin', 'viet');

--changeset system:017-assign-supervisor-role-to-default-users
INSERT INTO ums.user_roles (user_id, role_id)
SELECT u.id, r.id
FROM ums.users u
CROSS JOIN ums.roles r
WHERE u.username IN ('admin', 'viet')
AND r.role_name = 'supervisor';

--rollback DELETE FROM ums.user_roles WHERE user_id IN (SELECT id FROM ums.users WHERE username IN ('admin', 'viet'));

