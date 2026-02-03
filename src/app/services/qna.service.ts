import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QnaService {

  private apiUrl = 'http://localhost:8080/v1/chat/ask';

  constructor(private http: HttpClient) {}

  askQuestion(question: string): Observable<any> {
    return this.http.post(this.apiUrl, { question });
  }
}
