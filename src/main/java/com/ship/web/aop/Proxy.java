package com.ship.web.aop;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.ship.web.utl.Printer;

import lombok.Data;
@Data
@Component
@Lazy
public class Proxy {
	private int pagenum;
	private String search;
	@Autowired Printer p;
	public List<?> crawl(Map<?,?> paramMap){
		String url = "https://www."+paramMap.get("site")+"/";
		p.accept("넘어온 url: "+url);
		List<String> proxyList = new ArrayList<>(); 
		proxyList.clear();
		try {
			Connection.Response response = Jsoup.connect(url)
											.method(Connection.Method.GET)
											.execute();
			Document document = response.parse();
			String text = document.text();
			p.accept("크롤링한 텍스트:\n"+text);
			proxyList.add(text);
		} catch (Exception e) {
			e.printStackTrace();
		};
		return proxyList;
	}
}
