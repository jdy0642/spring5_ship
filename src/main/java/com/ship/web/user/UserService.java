package com.ship.web.user;
import java.util.List;
import org.springframework.stereotype.Component;
@Component
public interface UserService {

	public void join(User param);
	public User login(User param);
	public List<User> search(User param);
	public int countUser();
}
