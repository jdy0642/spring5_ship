package com.ship.web.ctx;
import javax.sql.DataSource;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
@Configuration
@MapperScan(basePackages = {"com.ship.web"})
@ComponentScan(basePackages = {"com.ship.web"})
public class RootContext {
	@Bean
	public DataSource dataSource() {
		HikariConfig hikariConfig = new HikariConfig();
		hikariConfig.setDriverClassName("com.mysql.jdbc.Driver");
		hikariConfig.setJdbcUrl("jdbc:mysql://localhost:3306/ship?serverTimezone=UTC");
		hikariConfig.setUsername("ship");
		hikariConfig.setPassword("ship");
		
		HikariDataSource dataSource = new HikariDataSource(hikariConfig);
		return dataSource;
}
	
}
