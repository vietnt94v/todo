package com.wms;

import com.wms.server.HttpServer;

public class Main {
    public static void main(String[] args) {
        try {
            HttpServer server = new HttpServer(8080);
            server.start();
            System.out.println("Server started on port 8080");
            System.out.println("Press Ctrl+C to stop the server");
        } catch (Exception e) {
            System.err.println("Failed to start server: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

