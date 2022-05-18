package rakkeri.rakkeri_server.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/test", "/hello", "/api/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();

        http.csrf().ignoringAntMatchers("/test", "/hello", "/api/**");
    }
}
