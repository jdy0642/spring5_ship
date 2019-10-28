package com.ship.web.brd;

import org.springframework.stereotype.Component;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data 
@Component
@AllArgsConstructor
@NoArgsConstructor
public class Article {
	private String artseq, image, uid, comments, msg, rating, boardtype, title, content; 
}
