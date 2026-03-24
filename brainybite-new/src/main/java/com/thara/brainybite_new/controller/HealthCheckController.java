package com.thara.brainybite_new.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthCheckController {

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        // ตอบกลับทันทีโดยไม่ต่อ Database!
        return ResponseEntity.ok("BrainyBite Backend is Awake and Healthy!");
    }
}
