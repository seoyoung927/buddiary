package com.stonesy.buddiary.web.controller.user;

import com.stonesy.buddiary.domain.user.User;
import com.stonesy.buddiary.service.user.LoginService;
import com.stonesy.buddiary.web.dto.user.IdTokenRequestDto;
import com.google.common.net.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.security.Principal;

import static com.stonesy.buddiary.web.dto.user.UserDto.convertToDto;

@RestController
public class LoginController {
    @Autowired
    LoginService loginService;

    @PostMapping("v1/oauth2/login")
    public ResponseEntity LoginWithGoogleOauth2(@RequestBody IdTokenRequestDto requestBody, HttpServletResponse response) {
        String authToken = loginService.loginOAuthGoogle(requestBody);
        final ResponseCookie cookie = ResponseCookie.from("AUTH-TOKEN", authToken)
                .maxAge(7 * 24 * 3600)
                .path("/")
                .secure(false)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().build();
    }

    @GetMapping("v1/oauth2/logout")
    public ResponseEntity LoginWithGoogleOauth2(Principal principal, HttpServletResponse response) {
        User user = null;
        String authToken = "";
        if(principal!=null){
            user = loginService.getUser(Long.valueOf(principal.getName()));
            authToken = loginService.logoutOAuthGoogle(user);
        }
        final ResponseCookie cookie = ResponseCookie.from("AUTH-TOKEN", authToken)
                .maxAge(1 * 1 * 0)
                .path("/")
                .secure(false)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().build();
    }


    @GetMapping("v1/oauth2/user/info")
    public ResponseEntity getUserInfo(Principal principal) {
        if(principal!=null){
            User user = loginService.getUser(Long.valueOf(principal.getName()));
            return ResponseEntity.ok().body(convertToDto(user));
        }else{
            return ResponseEntity.ok().body(convertToDto(new User()));
        }
    }


}
