package com.example.javaguideswebsocket.controller;

import com.example.javaguideswebsocket.domain.Greeting;
import com.example.javaguideswebsocket.domain.HelloMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GreetingController {
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws InterruptedException {
        //simulated delay
        Thread.sleep(1000);
        return new Greeting("Hello, "+message.getName()+"!");
    }
}
