--liquibase formatted sql

--changeset system:008-create-user-view
CREATE OR REPLACE VIEW ums.user_view AS
SELECT 
    u.id,
    u.username,
    u.email,
    u.full_name,
    u.created_at,
    u.updated_at,
    us.status_name,
    us.id as status_id,
    STRING_AGG(DISTINCT r.role_name, ', ') as roles,
    STRING_AGG(DISTINCT p.permission_name, ', ') as permissions
FROM ums.users u
LEFT JOIN ums.user_status us ON u.status_id = us.id
LEFT JOIN ums.user_roles ur ON u.id = ur.user_id
LEFT JOIN ums.roles r ON ur.role_id = r.id
LEFT JOIN ums.role_permissions rp ON r.id = rp.role_id
LEFT JOIN ums.permissions p ON rp.permission_id = p.id
GROUP BY u.id, u.username, u.email, u.full_name, u.created_at, u.updated_at, us.status_name, us.id;

--rollback DROP VIEW IF EXISTS ums.user_view;

