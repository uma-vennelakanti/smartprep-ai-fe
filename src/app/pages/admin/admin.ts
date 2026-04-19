import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {

  questions: any[] = [];

  editMode = false;
  editId = 0;

  form = {
    category: '',
    topic: '',
    difficulty: '',
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  getHeaders() {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  loadQuestions() {
    this.http.get<any[]>(
      'http://localhost:8080/api/admin/questions',
      { headers: this.getHeaders() }
    ).subscribe(res => {
      this.questions = res;
    });
  }

  saveQuestion() {

    if (this.editMode) {

      this.http.put(
        `http://localhost:8080/api/admin/questions/${this.editId}`,
        this.form,
        {
          headers: this.getHeaders(),
          responseType: 'text'
        }
      ).subscribe({
        next: (res) => {
          alert(res);
          this.resetForm();
          this.loadQuestions();
        }
      });

    } else {

      this.http.post(
        'http://localhost:8080/api/admin/questions',
        this.form,
        {
          headers: this.getHeaders(),
          responseType: 'text'
        }
      ).subscribe({
        next: (res) => {
          alert(res);
          this.resetForm();
          this.loadQuestions();
        }
      });
    }
  }

  editQuestion(q: any) {

    this.editMode = true;
    this.editId = q.id;

    this.form = {
      category: q.category,
      topic: q.topic,
      difficulty: q.difficulty,
      questionText: q.questionText,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctOption: q.correctOption
    };
  }

  deleteQuestion(id: number) {

    this.http.delete(
      `http://localhost:8080/api/admin/questions/${id}`,
      {
        headers: this.getHeaders(),
        responseType: 'text'
      }
    ).subscribe(() => {
      this.loadQuestions();
    });
  }

  resetForm() {

    this.editMode = false;
    this.editId = 0;

    this.form = {
      category: '',
      topic: '',
      difficulty: '',
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctOption: ''
    };
  }
}