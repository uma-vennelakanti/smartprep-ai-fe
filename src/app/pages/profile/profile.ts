import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  user: any = {};

  editMode = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  getHeaders() {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  loadProfile() {

    this.http.get(
      'http://localhost:8080/api/profile',
      { headers: this.getHeaders() }

    ).subscribe(res => {
      this.user = res;
    });
  }

  updateProfile() {

    this.http.put(
      'http://localhost:8080/api/profile',
      this.user,
      {
        headers: this.getHeaders(),
        responseType: 'text'
      }

    ).subscribe(res => {

      alert(res);

      this.editMode = false;
    });
  }
}