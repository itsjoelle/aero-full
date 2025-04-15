package com.example.restapp.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;



@Service
public class AirlineService {
    private final WebClient webClient;
    private final String apiKey;

    public AirlineService(WebClient webClient,
                          @Value("${aviationstack.api.key}") String apiKey){

        this.webClient=webClient;
        this.apiKey=apiKey;
    }

    public Mono<JsonNode> getAirlineData(){
        return webClient.get().uri(uriBuilder -> uriBuilder
                        .path("/v1/airlines")
                        .queryParam("access_key", apiKey)
                        .build())
                .retrieve()
                .bodyToMono(JsonNode.class);
    }
}
