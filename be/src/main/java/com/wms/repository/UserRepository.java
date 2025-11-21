package com.wms.repository;

import com.wms.model.User;
import com.wms.util.DatabaseConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserRepository {
    private final DatabaseConnection dbConnection;

    public UserRepository() {
        this.dbConnection = DatabaseConnection.getInstance();
    }

    public User findByUsername(String username) throws SQLException {
        String sql = "SELECT id, username, password_hash, email, full_name, status_id " +
                    "FROM ums.users WHERE username = ?";
        
        try (Connection conn = dbConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, username);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                User user = new User();
                user.setId(rs.getInt("id"));
                user.setUsername(rs.getString("username"));
                user.setPasswordHash(rs.getString("password_hash"));
                user.setEmail(rs.getString("email"));
                user.setFullName(rs.getString("full_name"));
                user.setStatusId(rs.getInt("status_id"));
                return user;
            }
            return null;
        }
    }

    public List<User> findAll() throws SQLException {
        String sql = "SELECT id, username, email, full_name, status_id, status_name, " +
                    "roles, permissions, created_at, updated_at FROM ums.user_view " +
                    "ORDER BY created_at DESC";
        
        List<User> users = new ArrayList<>();
        
        try (Connection conn = dbConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            while (rs.next()) {
                User user = new User(
                    rs.getInt("id"),
                    rs.getString("username"),
                    rs.getString("email"),
                    rs.getString("full_name"),
                    rs.getInt("status_id"),
                    rs.getString("status_name"),
                    rs.getString("roles"),
                    rs.getString("permissions"),
                    rs.getTimestamp("created_at"),
                    rs.getTimestamp("updated_at")
                );
                users.add(user);
            }
        }
        
        return users;
    }

    public User findById(int id) throws SQLException {
        String sql = "SELECT id, username, email, full_name, status_id, status_name, " +
                    "roles, permissions, created_at, updated_at FROM ums.user_view WHERE id = ?";
        
        try (Connection conn = dbConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return new User(
                    rs.getInt("id"),
                    rs.getString("username"),
                    rs.getString("email"),
                    rs.getString("full_name"),
                    rs.getInt("status_id"),
                    rs.getString("status_name"),
                    rs.getString("roles"),
                    rs.getString("permissions"),
                    rs.getTimestamp("created_at"),
                    rs.getTimestamp("updated_at")
                );
            }
            return null;
        }
    }

    public User create(User user, String passwordHash, List<Integer> roleIds) throws SQLException {
        Connection conn = null;
        try {
            conn = dbConnection.getConnection();
            conn.setAutoCommit(false);

            String insertUserSql = "INSERT INTO ums.users (username, password_hash, email, full_name, status_id) " +
                                  "VALUES (?, ?, ?, ?, ?) RETURNING id";
            
            int userId;
            try (PreparedStatement stmt = conn.prepareStatement(insertUserSql)) {
                stmt.setString(1, user.getUsername());
                stmt.setString(2, passwordHash);
                stmt.setString(3, user.getEmail());
                stmt.setString(4, user.getFullName());
                stmt.setInt(5, user.getStatusId());
                
                ResultSet rs = stmt.executeQuery();
                if (rs.next()) {
                    userId = rs.getInt(1);
                } else {
                    throw new SQLException("Failed to create user");
                }
            }

            if (roleIds != null && !roleIds.isEmpty()) {
                String insertRolesSql = "INSERT INTO ums.user_roles (user_id, role_id) VALUES (?, ?)";
                try (PreparedStatement stmt = conn.prepareStatement(insertRolesSql)) {
                    for (Integer roleId : roleIds) {
                        stmt.setInt(1, userId);
                        stmt.setInt(2, roleId);
                        stmt.addBatch();
                    }
                    stmt.executeBatch();
                }
            }

            conn.commit();
            return findById(userId);
            
        } catch (SQLException e) {
            if (conn != null) {
                conn.rollback();
            }
            throw e;
        } finally {
            if (conn != null) {
                conn.setAutoCommit(true);
                conn.close();
            }
        }
    }

    public User update(int id, User user) throws SQLException {
        String sql = "UPDATE ums.users SET email = ?, full_name = ?, status_id = ?, " +
                    "updated_at = CURRENT_TIMESTAMP WHERE id = ?";
        
        try (Connection conn = dbConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, user.getEmail());
            stmt.setString(2, user.getFullName());
            stmt.setInt(3, user.getStatusId());
            stmt.setInt(4, id);
            
            int rowsAffected = stmt.executeUpdate();
            if (rowsAffected > 0) {
                return findById(id);
            }
            return null;
        }
    }

    public boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM ums.users WHERE id = ?";
        
        try (Connection conn = dbConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            return stmt.executeUpdate() > 0;
        }
    }

    public List<Integer> getRoleIdsByName(List<String> roleNames) throws SQLException {
        if (roleNames == null || roleNames.isEmpty()) {
            return new ArrayList<>();
        }

        StringBuilder sql = new StringBuilder("SELECT id FROM ums.roles WHERE role_name IN (");
        for (int i = 0; i < roleNames.size(); i++) {
            sql.append(i > 0 ? ",?" : "?");
        }
        sql.append(")");

        List<Integer> roleIds = new ArrayList<>();
        
        try (Connection conn = dbConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql.toString())) {
            
            for (int i = 0; i < roleNames.size(); i++) {
                stmt.setString(i + 1, roleNames.get(i));
            }
            
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                roleIds.add(rs.getInt("id"));
            }
        }
        
        return roleIds;
    }
}

