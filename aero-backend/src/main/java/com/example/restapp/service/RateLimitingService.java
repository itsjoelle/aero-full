package com.example.restapp.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RateLimitingService {
    private final RedisTemplate<String, String> redisTemplate;
    private static final int MAX_REQUESTS = 10;
    private static final int TIME_WINDOW = 60;

    public RateLimitingService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void checkRateLimit(String clientToken){
        String redisKey = "rate_limit:" + clientToken;
        Long requestCount = redisTemplate.opsForValue().increment(redisKey);

        if(requestCount == 1){
            redisTemplate.expire(redisKey, Duration.ofSeconds(TIME_WINDOW));
        }

        if(requestCount > MAX_REQUESTS){
            throw new RuntimeException("Too many requests, Try again later.");
        }
    }
}
