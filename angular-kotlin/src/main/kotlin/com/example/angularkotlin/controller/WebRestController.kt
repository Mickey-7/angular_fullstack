package com.example.angularkotlin.controller

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class WebRestController {
    @RequestMapping("/api/hi")
    fun hi(): String{
        return "Message from Spring Boot Restful API!"
    }
}