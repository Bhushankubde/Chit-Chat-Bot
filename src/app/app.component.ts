

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QnaService } from './services/qna.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  question: string = '';
  loading: boolean = false;
  messages: { text: string; user: boolean }[] = [];

  constructor(private qnaService: QnaService) {}

  sendQuestion() {
    if (!this.question.trim()) return;

    // Add user question to messages
    this.messages.push({ text: this.question.trim(), user: true });
    const questionToSend = this.question.trim();
    this.question = '';
    this.loading = true;

    this.qnaService.askQuestion(questionToSend)
      .subscribe({
        next: (res: any) => {
          // Add bot answer to messages
          const answerText = res.candidates[0].content.parts[0].text;
          this.messages.push({ text: answerText, user: false });
          this.loading = false;
          this.scrollToBottom();
        },
        error: () => {
          this.messages.push({ text: '❌ Error contacting server!', user: false });
          this.loading = false;
          this.scrollToBottom();
        }
      });
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatWindow = document.querySelector('.chat-window');
      if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }
    }, 100);
  }

  resetChat() {
  this.messages = [];
  this.question = '';
  this.loading = false;

  this.scrollToBottom();
}

}