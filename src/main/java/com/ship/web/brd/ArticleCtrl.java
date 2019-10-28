package com.ship.web.brd;
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
import com.ship.web.utl.Printer;

@RestController
@RequestMapping("/articles")
public class ArticleCtrl {
	private static final Logger logger = LoggerFactory.getLogger(ArticleCtrl.class);
	@Autowired Article article;
	@Autowired Printer printer;
	@Autowired Map <String, Object> map;
	@Autowired ArticleMapper articleMapper;
	
	@PostMapping("/")
	public Map<?,?> write(@RequestBody Article param) {
		logger.info("롸이트");
		map.clear();
		map.put("msg", "SUCCESS");
		logger.info("롸이트2");
		return map;
	}
	
	@GetMapping("/{artseq}")
	public Map<?,?> read(@PathVariable String artseq, @RequestBody Article param) {
		return map;
	} 
	@PutMapping("/{artseq}")
	public Map<?,?> update(@PathVariable String artseq, @RequestBody Article param) {
		return map;
	} 
	@DeleteMapping("/{artseq}")
	public Map<?,?> delete(@PathVariable String artseq, @RequestBody Article param) {
		return map;
	} 
}
