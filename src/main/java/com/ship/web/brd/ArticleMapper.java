package com.ship.web.brd;


public interface ArticleMapper {
	public void insertArticles(Article article);
	public void selectArticles(Article article);
	public void updateArticles(Article article);
	public void deleteArticles(Article article);
}
