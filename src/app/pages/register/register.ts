
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  user = {
    name: '',
    email: '',
    password: '',
    college: '',
    branch: '',
    graduationYear: '',
    skills: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register() {

    this.http.post(
      'http://localhost:8080/api/auth/register',
      this.user,
        { responseType: 'text' }
    ).subscribe({
      next: () => {
        alert('Registered Successfully');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Registration Failed');
      }
    });
  }
}