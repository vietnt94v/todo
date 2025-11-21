package com.wms.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sun.net.httpserver.HttpExchange;
import com.wms.server.HttpServer;
import com.wms.service.AuthService;

import java.io.IOException;
import java.util.Map;

public class AuthController {
    private final AuthService authService;
    private final Gson gson;

    public AuthController() {
        this.authService = new AuthService();
        this.gson = new Gson();
    }

    public void login(HttpExchange exchange) throws IOException {
        try {
            String body = HttpServer.getRequestBody(exchange);
            JsonObject json = gson.fromJson(body, JsonObject.class);
            
            String username = json.get("username").getAsString();
            String password = json.get("password").getAsString();

            Map<String, Object> result = authService.login(username, password);
            
            String response = gson.toJson(result);
            HttpServer.sendResponse(exchange, 200, response);
            
        } catch (Exception e) {
            String errorResponse = gson.toJson(Map.of("error", e.getMessage()));
            HttpServer.sendResponse(exchange, 401, errorResponse);
        }
    }
}

