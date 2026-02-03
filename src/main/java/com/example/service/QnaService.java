package com.example.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;


import java.util.Map;

@Service
public class QnaService {

    @Value("${gemini_api-key}")
    private String geminiApiKey;

    @Value("${gemini_api-url}")
    private String getGeminiApiUrl;

    private final WebClient webClient;

    public QnaService(WebClient.Builder webClient) {
        this.webClient = webClient.build();
    }

    public String getAnswer(String question) {

        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of(
                                "parts", new Object[]{
                                        Map.of(
                                                "text", question
                                        )
                                }
                        )
                }
        );


        String response = webClient
                .post()
                .uri(getGeminiApiUrl + "?key=" + geminiApiKey) // <-- Correct URL usage
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return response;
    }
}
