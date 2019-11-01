package com.ship.web.adm;
import java.util.List;
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
import com.ship.web.cmm.IFunction;
import com.ship.web.utl.Printer;

@RestController
@RequestMapping("/admins")
public class AdminCtrl {
	private static final Logger logger = LoggerFactory.getLogger(AdminCtrl.class);
	@Autowired Admin admin;
	@Autowired Printer printer;
	@Autowired Map <String, Object> map;
	@Autowired AdminMapper adminMapper;
	
	@PostMapping("/{aid}")
	public Map<?,?> access(@PathVariable String aid, @RequestBody Admin param){
		logger.info("어드민");
		IFunction<Admin, Admin> f = t -> adminMapper.selectByAdminIdPw(param);
		map.clear();
		map.put("msg", (f.apply(param))!=null ? "SUCCESS" : "FAIL");
		logger.info("어드민2"+param);
		return map;
	}
	@GetMapping("/")
	public Map<?,?> select(@RequestBody Admin param){
		return null;
	}
	@PutMapping("/")
	public Map<?,?> update(@RequestBody Admin param){
		return null;
	}
	@DeleteMapping("/")
	public Map<?,?> delete(@RequestBody Admin param){
		return null;
	}
}
