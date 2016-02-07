package com.infonal.usermanagement.unit;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.assertTrue;

import com.infonal.usermanagement.model.User;
import com.infonal.usermanagement.config.AppConfig;  

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {AppConfig.class})
public class UserTest {
	
	@Autowired
    private User user;
	
	@Test
	public void testFirstNameIsNotNumeric() {
		assertTrue(!user.getFirstName().matches("-?\\d+(.\\d+)?"));
	}

	@Test
	public void testLastNameIsNotNumeric() {
		assertTrue(!user.getLastName().matches("-?\\d+(.\\d+)?"));
	}
	
}
