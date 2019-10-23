package com.ship.web.user;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ship.web.cmm.IConsumer;
import com.ship.web.cmm.IFunction;
import com.ship.web.utl.Printer;


@RestController
@RequestMapping("/users")
public class UserCtrl {
	private static final Logger logger = LoggerFactory.getLogger(UserCtrl.class);
	@Autowired User user;
	@Autowired Printer printer;
	@Autowired Map <String, Object> map;
	@Autowired UserMapper userMapper;
 	
	@PostMapping("/")
	public String join(@RequestBody User param) {
		logger.info("ajax1가 보낸 아이디 비번{}",param.getUid()+","+param.getUpw()+","+param.getUname());
		IConsumer<User> c = t -> userMapper.insertUser(param);
		c.accept(param);
		return "Suc";
		};
	
	@PostMapping("/login")
	public User login(@RequestBody User param) {
		logger.info("ajax2가 보낸 아이디 비번{}",param.getUid()+","+param.getUpw());
			
		IFunction<User, User> f = t -> userMapper.selectByIdPw(param);
		return f.apply(param);
	}
};
