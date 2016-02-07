/*
 * Author: Cihan Ýmren
 * Date: 06.02.2016
 * 
 */
package com.infonal.usermanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
 
import com.infonal.usermanagement.model.User;
import com.infonal.usermanagement.service.UserService;
   
@Controller    
public class UserController {  
   
	@Autowired
	private UserService userService;
	
	//Get All Users
	@RequestMapping(value = "/users/", method = RequestMethod.GET)
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.listUsers();
        //Check if the database is empty
        if(users.isEmpty()){
        	return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT); //return NO_CONTENT message
        }
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }
		
	//Add User
    @RequestMapping(value = "/user/add", method = RequestMethod.POST)     
	public ResponseEntity<User> createUser(@RequestBody User user) {
    	
    	//check if the user exists
    	if(userService.userExists(user.getUserId())){	
    		return new ResponseEntity<User>(HttpStatus.CONFLICT); //return conflict message
    	} else {    		   		
    		userService.addUser(user);
    	}
    	return new ResponseEntity<User>(user, HttpStatus.OK);
    }
    
    // Update User
    @RequestMapping(value = "/user/{userId}", method = RequestMethod.PUT)     
	public ResponseEntity<User> updateUser(@PathVariable("userId") String userId, @RequestBody User user) {
    	
    	User currentUser = userService.getUserById(userId);
    	//check if the users exists with provided user id
    	if(currentUser==null){
    		return new ResponseEntity<User>(HttpStatus.NOT_FOUND); //return not found message
    	}
    	
    	//set attributes of the user
    	currentUser.setFirstName(user.getFirstName()); 
    	currentUser.setLastName(user.getLastName()); 
    	currentUser.setPhone(user.getPhone()); 
    	
    	userService.updateUser(currentUser);    	
    	return new ResponseEntity<User>(currentUser, HttpStatus.OK);
    }

    //Delete User
    @RequestMapping(value = "/user/{userId}", method = RequestMethod.DELETE)     
	public ResponseEntity<User> deleteUser(@PathVariable("userId") String userId) {
    	    	
    	User currentUser = userService.getUserById(userId);
    	//check if the users exists with provided user id
    	if(currentUser==null){
    		return new ResponseEntity<User>(HttpStatus.NOT_FOUND); //return not found message
    	}
    	    	    	
    	userService.deleteUser(currentUser);    	
    	return new ResponseEntity<User>(HttpStatus.OK);
    }
    
    //Delete All Users
    @RequestMapping(value = "/users/", method = RequestMethod.DELETE)
    public ResponseEntity<User> deleteAllUsers(){
    	userService.deleteAll();
    	return new ResponseEntity<User>(HttpStatus.OK);
    }    
    
    @RequestMapping(value = "create/{name}", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public User createDummy(@PathVariable String name) {     	
		User user = new User();
		user.setFirstName("User");
		user.setLastName(name);
		user.setPhone("+9001234567890");     
		userService.addUser(user);         			    	
	    return user;     
    }           
    
}
