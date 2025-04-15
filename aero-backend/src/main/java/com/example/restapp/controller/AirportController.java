package com.example.restapp.controller;

import com.example.restapp.Utils.CookieUtil;
import com.example.restapp.service.AirportService;
import com.example.restapp.service.RateLimitingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;


@RestController
@CrossOrigin
@RequestMapping("/")
public class AirportController {

    @Autowired
    private final AirportService airportService;
    private final RateLimitingService rateLimitingService;


    public AirportController(AirportService airportService, RateLimitingService rateLimitingService) {
        this.airportService = airportService;
        this.rateLimitingService= rateLimitingService;

    }

    @GetMapping("/airports")
    public Mono<ResponseEntity<?>> getData(ServerWebExchange exchange){
        String clientToken= CookieUtil.getClientCookie(exchange);

        if(clientToken == null){
            clientToken = CookieUtil.generateNewClientToken();
            CookieUtil.setClientCookie(exchange,clientToken);
        }

        try{
            rateLimitingService.checkRateLimit(clientToken);
            return airportService.getAirportData()
                    .map(ResponseEntity::ok);
        } catch(RuntimeException e){
            return Mono.just(ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(e.getMessage()));
        }
    }
}


