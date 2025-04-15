package com.example.restapp.controller;

import com.example.restapp.Utils.CookieUtil;
import com.example.restapp.service.RTFlightsServive;
import com.example.restapp.service.RateLimitingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;



@RestController
@CrossOrigin
@RequestMapping
public class RTFlightsController {

    @Autowired
    private final RTFlightsServive rtFlightsServive;
    private final RateLimitingService rateLimitingService;

    public RTFlightsController(RTFlightsServive rtFlightsServive, RateLimitingService rateLimitingService){
        this.rtFlightsServive = rtFlightsServive;
        this.rateLimitingService = rateLimitingService;
    }

    @GetMapping("/realtimeflights")
    public Mono<ResponseEntity<?>> getRealTimeFlights(ServerWebExchange exchange){
        String clientToken = CookieUtil.getClientCookie(exchange);

        if (clientToken == null) {
            clientToken = CookieUtil.generateNewClientToken();
            CookieUtil.setClientCookie(exchange, clientToken);
        }

        try {
            rateLimitingService.checkRateLimit(clientToken);
            return rtFlightsServive.getRTFlightsData()
                    .map(ResponseEntity::ok);

        } catch(RuntimeException e){
            return Mono.just(ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(e.getMessage()));
        }
    }
}
