package com.wms.server;

import com.sun.net.httpserver.HttpExchange;
import com.wms.controller.AuthController;
import com.wms.controller.UserController;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.Properties;

public class HttpServer {
    private final com.sun.net.httpserver.HttpServer server;
    private final AuthController authController;
    private final UserController userController;
    private String corsOrigins;

    public HttpServer(int port) throws IOException {
        this.server = com.sun.net.httpserver.HttpServer.create(new InetSocketAddress(port), 0);
        this.authController = new AuthController();
        this.userController = new UserController();
        loadProperties();
        setupRoutes();
    }

    private void loadProperties() {
        try (InputStream input = getClass().getClassLoader()
                .getResourceAsStream("application.properties")) {
            Properties prop = new Properties();
            if (input != null) {
                prop.load(input);
                this.corsOrigins = prop.getProperty("server.cors.origins", "*");
            }
        } catch (Exception e) {
            this.corsOrigins = "*";
        }
    }

    private void setupRoutes() {
        server.createContext("/api/auth/login", this::handleWithCors);
        server.createContext("/api/users", this::handleWithCors);
        server.setExecutor(null);
    }

    private void handleWithCors(HttpExchange exchange) throws IOException {
        addCorsHeaders(exchange);

        if ("OPTIONS".equals(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        String path = exchange.getRequestURI().getPath();
        String method = exchange.getRequestMethod();

        try {
            if (path.equals("/api/auth/login") && "POST".equals(method)) {
                authController.login(exchange);
            } else if (path.equals("/api/users") && "GET".equals(method)) {
                userController.getAllUsers(exchange);
            } else if (path.equals("/api/users") && "POST".equals(method)) {
                userController.createUser(exchange);
            } else if (path.matches("/api/users/\\d+") && "GET".equals(method)) {
                String id = path.substring(path.lastIndexOf('/') + 1);
                userController.getUserById(exchange, Integer.parseInt(id));
            } else if (path.matches("/api/users/\\d+") && "PUT".equals(method)) {
                String id = path.substring(path.lastIndexOf('/') + 1);
                userController.updateUser(exchange, Integer.parseInt(id));
            } else if (path.matches("/api/users/\\d+") && "DELETE".equals(method)) {
                String id = path.substring(path.lastIndexOf('/') + 1);
                userController.deleteUser(exchange, Integer.parseInt(id));
            } else {
                sendResponse(exchange, 404, "{\"error\":\"Not found\"}");
            }
        } catch (Exception e) {
            e.printStackTrace();
            sendResponse(exchange, 500, "{\"error\":\"" + e.getMessage() + "\"}");
        }
    }

    private void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", corsOrigins);
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
        exchange.getResponseHeaders().add("Access-Control-Max-Age", "3600");
    }

    public static void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        exchange.getResponseHeaders().add("Content-Type", "application/json");
        byte[] bytes = response.getBytes();
        exchange.sendResponseHeaders(statusCode, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }

    public static String getRequestBody(HttpExchange exchange) throws IOException {
        try (InputStream is = exchange.getRequestBody()) {
            return new String(is.readAllBytes());
        }
    }

    public static String getAuthToken(HttpExchange exchange) {
        String authHeader = exchange.getRequestHeaders().getFirst("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }

    public void start() {
        server.start();
    }

    public void stop() {
        server.stop(0);
    }
}

