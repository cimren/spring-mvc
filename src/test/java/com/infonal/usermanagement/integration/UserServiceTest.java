package com.infonal.usermanagement.integration;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.assertEquals;

import com.infonal.usermanagement.service.UserService;
import com.infonal.usermanagement.config.AppConfig;  


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {AppConfig.class})
public class UserServiceTest {
	
	@Autowired
    private UserService userService;

    @Test
	public void testUserService() {
		assertEquals(
				"class com.infonal.usermanagement.service.UserService",
				this.userService.getClass().toString());
	}
    
}
