package com.ship.web.user;

import org.springframework.stereotype.Repository;

@Repository
public interface UserMapper {
	public void insertUser(User user);
	public User selectByIdPw(User user);
}
