package pl.edu.agh.web.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import pl.edu.agh.web.config.DatabaseConfig;

@Configuration
@Import({DatabaseConfig.class})
@PropertySource("classpath:application.properties")
@PropertySource("classpath:database.properties")
@ComponentScan(basePackages="pl.edu.agh.web.api, pl.edu.agh.web.config")
@EntityScan(basePackages="pl.edu.agh.model")
@EnableJpaRepositories(basePackages="pl.edu.agh.dao")
@EnableAutoConfiguration
public class Application {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }
}
