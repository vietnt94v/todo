package com.example.todo_api.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class HelloController {
    @GetMapping("/api/hello")
    public String hello() {
        return "Hello Spring Boot, Viet!";
    }
}
