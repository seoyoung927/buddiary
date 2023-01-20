package com.stonesy.buddiary.config.auth;

import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final JWTRequestFilter jwtRequestFilter;

    public SecurityConfig(JWTRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors();
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        http.authorizeRequests()
                .antMatchers("/v1/api/hello").permitAll()
                .antMatchers("/v1/oauth2/login").permitAll()
                .antMatchers("/v1/oauth2/logout").permitAll()
                .antMatchers("/v1/oauth2/user/info").permitAll()
                .antMatchers("/v1/api/todo/*").permitAll()
                .antMatchers("/v1/api/todo/save").permitAll()
                .antMatchers("/v1/api/todo/delete/*").permitAll()
                .antMatchers("/v1/api/todo/update/*").permitAll()
                .antMatchers("/v1/api/todo/update/done/*").permitAll()
                .antMatchers("/v1/api/category/save").permitAll()
                .antMatchers("/v1/api/category/*").permitAll()
                .antMatchers("/v1/api/category/delete/*").permitAll()
                .antMatchers("/v1/api/category/update/*").permitAll()
                .antMatchers("/v1/api/user/search/email/*").permitAll()
                .antMatchers("/v1/api/user/search/id/*").permitAll()
                .antMatchers("v1/api/user/delete/*").permitAll()
                .antMatchers("/v1/api/friend/save").permitAll()
                .antMatchers("/v1/api/friend/*").permitAll()
                .antMatchers("/v1/api/friend/delete/*").permitAll()
                .antMatchers("/v1/api/friend/update/status/*").permitAll()
                .antMatchers("/v1/api/friend/delete/*").permitAll()
                .antMatchers("/v1/api/friend/category/*").permitAll()
                .antMatchers("/v1/api/friend/todo/*").permitAll()
                .anyRequest().authenticated();
    }
}
