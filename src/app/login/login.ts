
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  username: string = '';
  password: string = '';
  error: string = '';
  success: string = '';

  constructor(private http: HttpClient) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.error = '';
    this.success = '';
    this.http.post<any>('http://localhost:5000/api/login', {
      username: this.username,  
      password: this.password
      
    }).subscribe({
      next: (res) => {
        // Save token and user info to localStorage
        localStorage.setItem('auth_token', res.token || 'demo_token');
        if (res.user) {
          localStorage.setItem('user_info', JSON.stringify(res.user));
        }
        this.success = res.message || 'Login successful!';
        // Redirect to home/dashboard
        window.location.href = '/';
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed.';
      }
    });
  }
}
