import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roll-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './roll-user.html',
  styleUrl: './roll-user.css',
})
export class RollUser {
  roles: any[] = [];
  username: string = '';
  role: string = '';
  message: string = '';
  error: string = '';
  loading = true;

  constructor(private http: HttpClient) {
    this.fetchRoles();
  }

  fetchRoles() {
    this.loading = true;
    this.http.get<any[]>('http://localhost:5000/api/roles').subscribe({
      next: (data) => {
        this.roles = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load roles.';
        this.loading = false;
      }
    });
  }

  createRole() {
    this.message = '';
    this.error = '';
    if (!this.username || !this.role) {
      this.error = 'Username and role are required.';
      return;
    }
    this.http.post('http://localhost:5000/api/roles', { username: this.username, role: this.role }).subscribe({
      next: () => {
        this.message = 'Role created successfully!';
        this.username = '';
        this.role = '';
        this.fetchRoles();
      },
      error: (err) => {
        this.error = err.error?.message || 'Error creating role.';
      }
    });
  }
}
