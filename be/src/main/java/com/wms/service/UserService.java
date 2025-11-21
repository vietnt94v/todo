package com.wms.service;

import com.wms.model.User;
import com.wms.repository.UserRepository;
import com.wms.util.PasswordUtil;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserService {
    private final UserRepository userRepository;

    public UserService() {
        this.userRepository = new UserRepository();
    }

    public List<User> getAllUsers() throws SQLException {
        return userRepository.findAll();
    }

    public User getUserById(int id) throws SQLException {
        User user = userRepository.findById(id);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        return user;
    }

    public User createUser(User user, String password, List<String> roleNames) throws SQLException {
        String passwordHash = PasswordUtil.hashPassword(password);
        
        List<Integer> roleIds = new ArrayList<>();
        if (roleNames != null && !roleNames.isEmpty()) {
            roleIds = userRepository.getRoleIdsByName(roleNames);
        }
        
        return userRepository.create(user, passwordHash, roleIds);
    }

    public User updateUser(int id, User user) throws SQLException {
        User existingUser = userRepository.findById(id);
        if (existingUser == null) {
            throw new RuntimeException("User not found");
        }
        
        return userRepository.update(id, user);
    }

    public boolean deleteUser(int id) throws SQLException {
        User existingUser = userRepository.findById(id);
        if (existingUser == null) {
            throw new RuntimeException("User not found");
        }
        
        return userRepository.delete(id);
    }
}

