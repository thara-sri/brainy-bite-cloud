package com.thara.brainybite_new;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EntityScan(basePackages = "com.thara.brainybite_new.entity")
@EnableJpaAuditing
public class BrainybiteNewApplication {

	public static void main(String[] args) {
		SpringApplication.run(BrainybiteNewApplication.class, args);
	}

}
