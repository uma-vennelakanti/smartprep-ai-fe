import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  isAdmin = false;
  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.checkUser();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkUser();
      }
    });
  }

  checkUser() {

    const token = localStorage.getItem('token');

    // reset always first
    this.isAdmin = false;
    this.isLoggedIn = false;

    if (!token) return;

    try {

      const payload =
        JSON.parse(atob(token.split('.')[1]));

      this.isLoggedIn = true;
      this.isAdmin = payload.role === 'ADMIN';

    } catch (e) {

      this.isLoggedIn = false;
      this.isAdmin = false;
    }
  }

  logout() {

    localStorage.removeItem('token');

    this.isLoggedIn = false;
    this.isAdmin = false;

    this.router.navigate(['/login']);
  }
}