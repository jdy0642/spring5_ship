package com.ship.web.test;
import java.util.ArrayList;
import java.util.List;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class Crawler2 {
	public static void main(String[] args) {
		try {
			Document rawData = Jsoup.connect("https://v4.map.naver.com/?query=%ED%92%8B%EC%82%B4%EC%9E%A5&type=SITE_1&queryRank=0")
					.timeout(10*1000).get();
				Elements artist = rawData.select("a[class=nclicks(plc.title,33118698,1,Y)]");
				Elements title = rawData.select("dd[class=cate]");
				List<String> artist2 = new ArrayList<>();
				List<String> title2 = new ArrayList<>();
				for(Element e : artist) {
					artist2.add(e.text());
				}
				for(Element e : title) {
					title2.add(e.text());
				}
				System.out.println(artist2);
				System.out.println("--------------------");
				System.out.println(title2);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
