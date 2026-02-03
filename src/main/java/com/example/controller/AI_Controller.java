package com.example.controller;

import com.example.service.QnaService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/v1/chat")
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")  // <-- Allow Angular frontend
@AllArgsConstructor
public class AI_Controller {

    private final QnaService qnaService;

    @PostMapping("/ask")
    public ResponseEntity<String> getAskQuestion(@RequestBody Map<String, String> payload){
        log.info("GetAskQuestion is started");
        String question = payload.get("question");
        String answer =  qnaService.getAnswer(question);
        log.info("GetAskQuestion is ended");
        return ResponseEntity.ok(answer);

    }
}
