package com.wms.service;

import com.wms.model.User;
import com.wms.repository.UserRepository;
import com.wms.util.JwtUtil;
import com.wms.util.PasswordUtil;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class AuthService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthService() {
        this.userRepository = new UserRepository();
        this.jwtUtil = JwtUtil.getInstance();
    }

    public Map<String, Object> login(String username, String password) throws SQLException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new RuntimeException("Invalid username or password");
        }

        if (!PasswordUtil.checkPassword(password, user.getPasswordHash())) {
            throw new RuntimeException("Invalid username or password");
        }

        if (user.getStatusId() != 1) {
            throw new RuntimeException("User account is not active");
        }

        User userWithDetails = userRepository.findById(user.getId());

        String token = jwtUtil.generateToken(
                user.getUsername(),
                user.getId(),
                userWithDetails.getRoles());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", createUserResponse(userWithDetails));

        return response;
    }

    public User validateToken(String token) throws SQLException {
        if (!jwtUtil.isTokenValid(token)) {
            throw new RuntimeException("Invalid or expired token");
        }

        Integer userId = jwtUtil.getUserIdFromToken(token);
        User user = userRepository.findById(userId);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return user;
    }

    private Map<String, Object> createUserResponse(User user) {
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("id", user.getId());
        userMap.put("username", user.getUsername());
        userMap.put("email", user.getEmail());
        userMap.put("fullName", user.getFullName());
        userMap.put("status", user.getStatusName());
        userMap.put("roles", user.getRoles());
        return userMap;
    }
}
