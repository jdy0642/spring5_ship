package com.ship.web.usr;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ship.web.cmm.IConsumer;
import com.ship.web.cmm.IFunction;
import com.ship.web.cmm.IPredicate;
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
	public Map<?,?> join(@RequestBody User param) {
		printer.accept("join 들어옴");
		IConsumer<User> c = t -> userMapper.insertUser(param);
		c.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
		};

		@GetMapping("/{uid}/exist")
		public Map<?,?> existId(@PathVariable String uid){
			IFunction<String, Integer> f = t -> userMapper.existId(uid);
			map.clear();
				map.put("msg", f.apply(uid)==0 ? "SUCCESS" : "FAIL");
			return map;
		}
	
	@PostMapping("/{uid}")
	public User login(@PathVariable String uid, @RequestBody User param) {
		logger.info("ajax2가 보낸 아이디 비번{}",param.getUid()+","+param.getUpw());
		IFunction<User, User> f = t -> userMapper.selectUserByIdPw(param);
		logger.info("ajax2가 보낸 아이디 비번{}",param.getUid()+","+f.apply(param));
		return f.apply(param);
	}
	
	@GetMapping("/{uid}")
	public User searchUserById(@PathVariable String uid, @RequestBody User param) {
		IFunction<User, User> f = t -> userMapper.selectUserByIdPw(param);
		return f.apply(param);
	}
	@PutMapping("/{uid}")
	public Map<?,?> updateUser(@PathVariable String uid, @RequestBody User param) {
		IConsumer<User> c = t -> userMapper.selectUserByIdPw(param);
		c.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
	}
	@DeleteMapping("/{uid}")
	public Map<?,?> removeUser(@PathVariable String uid, @RequestBody User param) {
		IConsumer<User> c = t -> userMapper.selectUserByIdPw(param);
		c.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
	}
};
