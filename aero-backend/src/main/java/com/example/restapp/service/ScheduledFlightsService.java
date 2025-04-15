package com.example.restapp.service;


import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


@Service
public class ScheduledFlightsService {

    private final WebClient webClient;
    private final String apiKey;

    public ScheduledFlightsService(WebClient webClient,
                          @Value("${aviationstack.api.key}") String apiKey){
        this.webClient=webClient;
        this.apiKey=apiKey;
    }

    public Mono<JsonNode>  getScheduledFlightsData(){
        return webClient.get().uri(uriBuilder -> uriBuilder
                        .path("/v1/timetable")
                        .queryParam("access_key", apiKey)
                        .build())
                .retrieve()
                .bodyToMono(JsonNode.class);
    }
}
