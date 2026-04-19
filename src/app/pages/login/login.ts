import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    const data = {
      email: this.email,
      password: this.password
    };

    this.authService.login(data).subscribe({

      next: (res) => {

        this.authService.saveToken(res.token);

        const payload =
          JSON.parse(atob(res.token.split('.')[1]));

        const role = payload.role;

        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },

      error: () => {
        alert('Invalid credentials');
      }
    });
  }
}