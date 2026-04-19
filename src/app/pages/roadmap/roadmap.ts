import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roadmap.html',
  styleUrl: './roadmap.css'
})
export class Roadmap {

  roadmap = '';
  loading = false;

  constructor(private http: HttpClient) {}

  generateRoadmap() {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.loading = true;
    this.roadmap = '';

    this.http.get(
      'http://localhost:8080/api/ai/roadmap',
      {
        headers,
        responseType: 'text'
      }
    ).subscribe({
      next: (res) => {
        this.roadmap = res;
        this.loading = false;
      },
      error: () => {
        this.roadmap = 'Unable to generate roadmap.';
        this.loading = false;
      }
    });
  }
}