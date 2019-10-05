package pl.edu.agh.project;

import pl.edu.agh.web.config.DatabaseConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;

@Configuration
@Import({DatabaseConfig.class})
@PropertySource("classpath:application.properties")
@PropertySource("classpath:database.properties")
@ComponentScan(basePackages="pl.edu.agh.web.api")
@EntityScan(basePackages="pl.edu.agh.model")
@EnableJpaRepositories(basePackages="pl.edu.agh.dao")
@SpringBootApplication
@EnableAutoConfiguration
public class ProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectApplication.class, args);
	}
}
