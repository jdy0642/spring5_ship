package com.ship.web.user;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ship.web.utl.Printer;

import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/users")
public class UserCtrl {
	private static final Logger logger = LoggerFactory.getLogger(UserCtrl.class);
	@Autowired User user;
	@Autowired Printer printer;
	@Autowired Map <String, Object> map;
 	
	@PostMapping("/")
	public Map<?,?> join(@RequestBody User param) {
		//logger.info("ajax1가 보낸 아이디 비번{}",param.getUid()+","+param.getUpw()+","+param.getUname());
		printer.accept("람다 프린터가 출력한 아이디 비번"+param.getUid()+","+param.getUpw()+","+param.getUname());
		HashMap<String,String> map = new HashMap<>();
		map.put("uid", param.getUid());
		map.put("upw", param.getUpw());
		map.put("uname",param.getUname());
		//userService.join(param);
		logger.info("map1에 담긴 아이디와 비번{}", map.get("uid")+", "+map.get("upw")+","+map.get("uname"));
		return map;
	}
	@PostMapping("/login")
	public User login(@RequestBody User param) {
		logger.info("ajax2가 보낸 아이디 비번{}",param.getUid()+","+param.getUpw());
		user.setUid(param.getUid());
		user.setUpw(param.getUpw());
		//user = userService.login(param);
		logger.info("map2에 담긴 사용자 정보{}", user.toString());
		return user;
	}
}
