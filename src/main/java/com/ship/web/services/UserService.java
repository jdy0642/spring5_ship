package com.ship.web.services;
import java.util.List;
import org.springframework.stereotype.Component;

import com.ship.web.user.User;
@Component
public interface UserService {

	public void join(User param);
	public User login(User param);
	public List<User> search(User param);
	public int countUser();
}
