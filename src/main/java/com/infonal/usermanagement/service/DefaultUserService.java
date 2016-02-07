/*
 * Author: Cihan Ýmren
 * Date: 06.02.2016
 * 
 */
package com.infonal.usermanagement.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.infonal.usermanagement.model.User;

@Repository
public class DefaultUserService implements UserService {
	
	//Dependency injection is done with @Autowired annotation
	@Autowired
	private MongoTemplate mongoTemplate;
	
	//Define collection name as a constant variable
	public static final String COLLECTION_NAME = "user";
	
	public void addUser(User user) {
		//Create a random Id for the user using UUID class
		user.setUserId(UUID.randomUUID().toString());
		//Add user into the db
		mongoTemplate.insert(user, COLLECTION_NAME);
	}
	
	public void updateUser(User user) {
		mongoTemplate.save(user, COLLECTION_NAME);		
	}
	
	public void deleteUser(User user) {
		mongoTemplate.remove(user, COLLECTION_NAME);
	}
	
	public List<User> listUsers() {
		return mongoTemplate.findAll(User.class, COLLECTION_NAME);
	}
	
	public User getUserById(String userId){
		Query query = new Query();		
		
		//Add where condition into the query
		query.addCriteria(Criteria.where("userId").is(userId));		
		
		//Find the corresponding user for the specified criteria
		User user = mongoTemplate.findOne(query, User.class);		
		return user;
	}
	
	public boolean userExists(String userId){
		//Find the user for the specified phone number
		User user = getUserById(userId);
		
		//Check if it is null or not
		if(user == null)
			return false;
		return true;		
	}
	
	public void deleteAll(){
		mongoTemplate.dropCollection(COLLECTION_NAME);
	}

}
