package com.ship.web.usr;

import org.springframework.stereotype.Repository;

@Repository
public interface UserMapper {
	public void insertUser(User user);
	public User selectUserByIdPw(User user);
	
}
