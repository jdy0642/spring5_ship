package com.ship.web.pxy;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Supplier;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.ship.web.brd.ArticleMapper;
import com.ship.web.cmm.ISupplier;
import com.ship.web.utl.Printer;

import lombok.Data;

@Component @Data @Lazy
public class Proxy {
	private int pageNum, pageSize, startRow, endRow;
	private boolean existPrev, existNext;
	private String search;
	private final int BLOCK_SIZE = 5;
	@Autowired Printer p;
	@Autowired ArticleMapper articleMapper;
	
	public static void main(String[] args) {
	}
	
	public void paging() {
		ISupplier<String> s = () -> articleMapper.countArticle();
		int totalCount = Integer.parseInt(s.get());
		int pageCount = (totalCount%pageSize == 0) ? totalCount/pageSize : (totalCount/pageSize)+1;
		startRow = (pageNum-1)*pageSize;
		endRow = (pageNum==pageCount) ? totalCount -1 : startRow + pageSize -1;
		int blockCount = (pageCount%BLOCK_SIZE == 0) ? pageCount/BLOCK_SIZE : (pageCount/BLOCK_SIZE)+1;
		int blockNum = (pageNum-1)/BLOCK_SIZE;
		int startPage = blockNum*BLOCK_SIZE+1;
		int endPage = ((blockNum+1)!=blockCount) ? BLOCK_SIZE*(blockNum+1) : pageCount;
		existPrev = (blockNum != 0) ;
		existNext = (blockNum != (blockCount -1)) ;
		
	}
	public int parseInt(String param) {
		Function<String, Integer> f = s -> Integer.parseInt(s);
		return f.apply(param);
	}
	public List<?> crawl(Map<?,?> paramMap){
		String url = "http://"+paramMap.get("site")+"/";
		p.accept("넘어온 URL \n"+url);
		List<String> proxyList = new ArrayList<>();
		proxyList.clear();
		try {
			Connection.Response response = Jsoup.connect(url)
			                                    .method(Connection.Method.GET)
			                                    .execute();
			Document document = response.parse();
			String text = document.html();
			//String text = document.text();
			p.accept("크롤링한 텍스트 \n"+text);
			proxyList.add(text);
			
		} catch (Exception e2) {
			e2.printStackTrace();
		}
		return proxyList;
	}
	public int random(int a, int b) {
		BiFunction<Integer, Integer, Integer> f = (c,d) -> (int) (Math.random()*(d-c))+c;
		return f.apply(a,b);
	}

}