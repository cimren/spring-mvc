/*
 * Author: Cihan Ýmren
 * Date: 06.02.2016
 * 
 */
package com.infonal.usermanagement.service;

import java.util.List;
import com.infonal.usermanagement.model.User;

public interface UserService {
	
	public void addUser(User user);
	public void updateUser(User user);
	public void deleteUser(User user);
	
	public List<User> listUsers();
	public User getUserById(String userId);
	public boolean userExists(String userId);
	public void deleteAll();
}
