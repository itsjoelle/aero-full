package com.example.restapp.controller;

import com.example.restapp.Utils.CookieUtil;
import com.example.restapp.service.AirlineService;
import com.example.restapp.service.RateLimitingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;


@RestController
@CrossOrigin
@RequestMapping
public class AirlineController {

    @Autowired
    private final AirlineService airlineService;
    private final RateLimitingService rateLimitingService;

    public AirlineController(AirlineService airlineService, RateLimitingService rateLimitingService) {
        this.airlineService = airlineService;
        this.rateLimitingService = rateLimitingService;
    }


    @GetMapping("/airlines")
    public Mono<ResponseEntity<?>> getData(ServerWebExchange exchange){
        String clientToken = CookieUtil.getClientCookie(exchange);

        if (clientToken == null) {
            clientToken = CookieUtil.generateNewClientToken();
            CookieUtil.setClientCookie(exchange, clientToken);
        }

        try {
            rateLimitingService.checkRateLimit(clientToken);
            return airlineService.getAirlineData()
                    .map(ResponseEntity::ok);

        } catch(RuntimeException e){
            return Mono.just(ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(e.getMessage()));
        }
    }

}


