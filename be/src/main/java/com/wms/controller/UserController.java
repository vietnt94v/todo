package com.wms.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import com.sun.net.httpserver.HttpExchange;
import com.wms.model.User;
import com.wms.server.HttpServer;
import com.wms.service.AuthService;
import com.wms.service.UserService;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public class UserController {
    private final UserService userService;
    private final AuthService authService;
    private final Gson gson;

    public UserController() {
        this.userService = new UserService();
        this.authService = new AuthService();
        this.gson = new Gson();
    }

    private boolean authenticate(HttpExchange exchange) throws IOException {
        String token = HttpServer.getAuthToken(exchange);
        if (token == null) {
            HttpServer.sendResponse(exchange, 401, 
                gson.toJson(Map.of("error", "No authorization token provided")));
            return false;
        }

        try {
            authService.validateToken(token);
            return true;
        } catch (Exception e) {
            HttpServer.sendResponse(exchange, 401, 
                gson.toJson(Map.of("error", "Invalid or expired token")));
            return false;
        }
    }

    public void getAllUsers(HttpExchange exchange) throws IOException {
        if (!authenticate(exchange)) return;

        try {
            List<User> users = userService.getAllUsers();
            String response = gson.toJson(users);
            HttpServer.sendResponse(exchange, 200, response);
        } catch (Exception e) {
            HttpServer.sendResponse(exchange, 500, 
                gson.toJson(Map.of("error", e.getMessage())));
        }
    }

    public void getUserById(HttpExchange exchange, int id) throws IOException {
        if (!authenticate(exchange)) return;

        try {
            User user = userService.getUserById(id);
            String response = gson.toJson(user);
            HttpServer.sendResponse(exchange, 200, response);
        } catch (Exception e) {
            HttpServer.sendResponse(exchange, 404, 
                gson.toJson(Map.of("error", e.getMessage())));
        }
    }

    public void createUser(HttpExchange exchange) throws IOException {
        if (!authenticate(exchange)) return;

        try {
            String body = HttpServer.getRequestBody(exchange);
            JsonObject json = gson.fromJson(body, JsonObject.class);

            User user = new User();
            user.setUsername(json.get("username").getAsString());
            user.setEmail(json.get("email").getAsString());
            user.setFullName(json.has("fullName") ? json.get("fullName").getAsString() : null);
            user.setStatusId(json.has("statusId") ? json.get("statusId").getAsInt() : 1);

            String password = json.get("password").getAsString();
            
            List<String> roleNames = null;
            if (json.has("roles")) {
                roleNames = gson.fromJson(json.get("roles"), new TypeToken<List<String>>(){}.getType());
            }

            User createdUser = userService.createUser(user, password, roleNames);
            String response = gson.toJson(createdUser);
            HttpServer.sendResponse(exchange, 201, response);
            
        } catch (Exception e) {
            HttpServer.sendResponse(exchange, 400, 
                gson.toJson(Map.of("error", e.getMessage())));
        }
    }

    public void updateUser(HttpExchange exchange, int id) throws IOException {
        if (!authenticate(exchange)) return;

        try {
            String body = HttpServer.getRequestBody(exchange);
            JsonObject json = gson.fromJson(body, JsonObject.class);

            User user = new User();
            user.setEmail(json.get("email").getAsString());
            user.setFullName(json.has("fullName") ? json.get("fullName").getAsString() : null);
            user.setStatusId(json.has("statusId") ? json.get("statusId").getAsInt() : 1);

            User updatedUser = userService.updateUser(id, user);
            String response = gson.toJson(updatedUser);
            HttpServer.sendResponse(exchange, 200, response);
            
        } catch (Exception e) {
            HttpServer.sendResponse(exchange, 400, 
                gson.toJson(Map.of("error", e.getMessage())));
        }
    }

    public void deleteUser(HttpExchange exchange, int id) throws IOException {
        if (!authenticate(exchange)) return;

        try {
            userService.deleteUser(id);
            HttpServer.sendResponse(exchange, 204, "");
        } catch (Exception e) {
            HttpServer.sendResponse(exchange, 400, 
                gson.toJson(Map.of("error", e.getMessage())));
        }
    }
}

