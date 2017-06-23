package com.example.demo;

import javax.servlet.MultipartConfigElement;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableAutoConfiguration
public class ServletInitializer extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(ServletInitializer.class);
    }

    @Bean
    public ServletRegistrationBean dispatcherServletRegistration() {
        ServletRegistrationBean registration = new ServletRegistrationBean(new UploadServlet());
        registration.addUrlMappings("/upload");
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setLocation("D:\\upload");
        registration.setMultipartConfig(factory.createMultipartConfig());
        registration.setAsyncSupported(true);
        return registration;
    }

    public static void main(String[] args) {
        SpringApplication.run(ServletInitializer.class, args);
    }

}
