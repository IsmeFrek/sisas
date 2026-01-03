import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  studentCount: number = 0;

  constructor(private http: HttpClient) {
    this.fetchStudentCount();
  }

  fetchStudentCount() {
    this.http.get<{ count: number }>('http://localhost:5000/api/students/count')
      .subscribe({
        next: (res) => this.studentCount = res.count,
        error: () => this.studentCount = 0
      });
  }
}
