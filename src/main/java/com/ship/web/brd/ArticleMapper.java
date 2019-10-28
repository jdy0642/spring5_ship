package com.ship.web.brd;

import org.springframework.stereotype.Repository;

@Repository
public interface ArticleMapper {
	public void insertArticle(Article param);
	public void selectArticle(Article param);
	public void updateArticle(Article param);
	public void deleteArticle(Article param);
}
