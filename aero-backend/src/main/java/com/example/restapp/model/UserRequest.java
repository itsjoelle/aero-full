package com.example.restapp.model;

public class UserRequest {
    private String cookie;

    public String getCookie() {
        return cookie;
    }

    public void setCookie(String cookie) {
        this.cookie = cookie;
    }

    @Override
    public String toString() {
        return "UserRequest is " + cookie;
    }
}
