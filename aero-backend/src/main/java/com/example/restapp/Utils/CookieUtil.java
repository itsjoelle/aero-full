package com.example.restapp.Utils;

import org.springframework.http.ResponseCookie;
import org.springframework.web.server.ServerWebExchange;

import java.util.UUID;

public class CookieUtil {

    public static String getClientCookie(ServerWebExchange exchange){
        String clientToken = null;

        if(exchange.getRequest().getCookies().getFirst("clientToken") != null){
            clientToken = exchange.getRequest().getCookies().getFirst("clientToken").getValue();
        }

        return clientToken;
    }

    public static void setClientCookie(ServerWebExchange exchange, String clientToken){
        ResponseCookie cookie = ResponseCookie.from("clientToken", clientToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(60*60)
                .build();
        exchange.getResponse().addCookie(cookie);
    }

    public static String generateNewClientToken(){
        return UUID.randomUUID().toString();
    }

}
