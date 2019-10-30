package com.ship.web.brd;
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

import com.ship.web.cmm.IConsumer;
import com.ship.web.cmm.IFunction;
import com.ship.web.cmm.ISupplier;
import com.ship.web.utl.Printer;

@RestController
@RequestMapping("/articles")
public class ArticleCtrl {
	private static final Logger logger = LoggerFactory.getLogger(ArticleCtrl.class);
	@Autowired Article article;
	@Autowired Printer printer;
	@Autowired Map <String, Object> map;
	@Autowired ArticleMapper articleMapper;
	@Autowired List<Article> list;
	
	@PostMapping("/")
	public Map<?,?> write(@RequestBody Article param) {
		logger.info("롸이트");
		param.setBoardtype("게시판");
		IConsumer<Article> c = t -> articleMapper.insertArticle(param);
		c.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		logger.info("롸이트2");
		return map;
	}
	@GetMapping("/count")
	public Map<?,?> count() {
		logger.info("카운트");
		ISupplier<String> s = () -> articleMapper.countArticle(); 
		map.clear();
		map.put("count", s.get());
		logger.info("카운트2/"+s.get());
		return map;
	}
	
	@GetMapping("/")
	public List<Article> list(){
		list.clear();
		ISupplier<List<Article>> s = () -> articleMapper.selectList();
		printer.accept("전체 글 목록\n"+s.get());
		return s.get();
	}
	
	@PutMapping("/{artseq}")
	public Map<?,?> updateArticle(@PathVariable String artseq, @RequestBody Article param) {
		logger.info("수정"+param);
		IConsumer<Article> c = t -> articleMapper.updateArticle(param);
		c.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		logger.info("수정2");
		return map;
	} 
	@DeleteMapping("/{artseq}")
	public Map<?,?> deleteArticle(@PathVariable String artseq, @RequestBody Article param) {
		logger.info("삭제");
		IConsumer<Article> c = t -> articleMapper.deleteArticle(param);
		c.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		logger.info("삭제2");
		return map;
	} 
	@GetMapping("/{artseq}")
	public Map<?,?> read(@PathVariable String artseq, @RequestBody Article param) {
		return map;
	} 
}
