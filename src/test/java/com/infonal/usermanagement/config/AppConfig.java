package com.infonal.usermanagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.infonal.usermanagement.model.User;
import com.infonal.usermanagement.service.UserService;
import com.infonal.usermanagement.service.DefaultUserService;

@Configuration
public class AppConfig {
	@Bean
	public UserService getUserService() {
		return new DefaultUserService ();
	}
	
	@Bean
	public User getUser() {
		return new User();
	}

}