
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  data: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get(
      'http://localhost:8080/api/dashboard',
      { headers }
    ).subscribe({
      next: (res) => {
        this.data = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}