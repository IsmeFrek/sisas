import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-log',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-log.html',
  styleUrl: './user-log.css',
})
export class UserLog {
  logs: any[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient) {
    this.fetchLogs();
  }

  fetchLogs() {
    this.loading = true;
    this.http.get<any[]>('http://localhost:5000/api/user-logs').subscribe({
      next: (data) => {
        // Filter only login actions, sort by timestamp desc, take last 10
        this.logs = data
          .filter(log => log.action === 'login')
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 10);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load logs.';
        this.loading = false;
      }
    });
  }
}
