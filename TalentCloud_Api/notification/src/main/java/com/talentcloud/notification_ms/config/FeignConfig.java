package com.talentcloud.notification_ms.config;

import feign.RequestInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Configuration
public class FeignConfig {

    @Bean
    public RequestInterceptor requestInterceptor() {
        return requestTemplate -> {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (attributes != null) {
                HttpServletRequest request = attributes.getRequest();
                String rolesHeader = request.getHeader("X-User-Roles");
                if (rolesHeader != null) {
                    requestTemplate.header("X-User-Roles", rolesHeader);
                } else {
                    requestTemplate.header("X-User-Roles", "CLIENT"); // fallback
                }
            }
        };
    }
}
