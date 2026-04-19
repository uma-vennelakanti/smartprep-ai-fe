
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test.html',
  styleUrl: './test.css'
})
export class Test {

  category = 'Java';
  questions: any[] = [];
  answers: any = {};
  result: any;

  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  startTest() {

    this.http.get<any[]>(
      `http://localhost:8080/api/tests/start/${this.category}`,
      { headers: this.getHeaders() }
    ).subscribe(res => {
      this.questions = res;
      this.result = null;
    });
  }

  submitTest() {

    const payload = {
      category: this.category,
      answers: this.answers
    };

    this.http.post(
      'http://localhost:8080/api/tests/submit',
      payload,
      { headers: this.getHeaders() }
    ).subscribe(res => {
      this.result = res;
    });
  }
}