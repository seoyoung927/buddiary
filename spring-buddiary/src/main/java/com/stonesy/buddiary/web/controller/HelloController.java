package com.stonesy.buddiary.web.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("v1/api/hello")
    public String hello(){
        System.out.println("Hello");
        System.out.println("HEllo ");
        return "Hello World!";
    }
}
