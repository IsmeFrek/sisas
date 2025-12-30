import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-student',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './student.html',
  styleUrls: ['./student.css'],
})
export class Student implements OnInit {
  students: any[] = [];
  filteredStudents: any[] = [];
  searchTerm: string = '';
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentStudent: any = {
    name: '',
    gender: '',
    age: null,
    class: '',
    major: '',
    gmail: '',
    phone: '',
    dob: '',
    placeofbirth: '',
    currentAddress: '',
    grade: '',
    status: ''
  };
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.http.get<any[]>('http://localhost:5000/api/students')
      .subscribe({
        next: (data) => {
          this.students = data;
          this.filterStudents();
        },
        error: (error) => {
          console.error('Error loading students:', error);
          // Optionally add sample data for demo
          this.students = [];
          this.filterStudents();
        }
      });
  }

  filterStudents() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredStudents = this.students;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredStudents = this.students.filter(student =>
        student.name.toLowerCase().includes(term) ||
        student.major.toLowerCase().includes(term)
      );
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterStudents();
  }

  addStudent() {
    this.isEditMode = false;
    this.currentStudent = {
      name: '',
      gender: '',
      age: null,
      class: '',
      major: '',
      gmail: '',
      phone: '',
      dob: '',
      placeofbirth: '',
      currentAddress: '',
      grade: '',
      status: ''
    };
    this.showModal = true;
  }

  editStudent(student: any) {
    this.isEditMode = true;
    this.currentStudent = { ...student };
    this.showModal = true;
  }

  saveStudent() {
    // Ensure gender is lowercase before sending to API
    this.currentStudent.gender = (this.currentStudent.gender || '').toLowerCase();

    if (this.isEditMode) {
      // Update student
      this.http.put<any>(`http://localhost:5000/api/students/${this.currentStudent._id}`, this.currentStudent)
        .subscribe({
          next: () => {
            this.fetchStudents();
            this.closeModal();
            this.errorMessage = '';
          },
          error: (error) => {
            this.errorMessage = 'Failed to update student. Please try again.';
            console.error('Error updating student:', error);
            this.closeModal();
          }
        });
    } else {
      // Add new student
      this.http.post<any>('http://localhost:5000/api/students', this.currentStudent)
        .subscribe({
          next: (createdStudent) => {
            if (createdStudent && createdStudent._id) {
              this.fetchStudents();
              this.closeModal();
              this.errorMessage = '';
            } else {
              this.errorMessage = 'Student not saved to database. API did not return _id.';
            }
          },
          error: (error) => {
            // Show backend error message if available
            if (error.error && error.error.error) {
              this.errorMessage = error.error.error;
            } else if (error.error && error.error.message) {
              this.errorMessage = error.error.message;
            } else if (error.message) {
              this.errorMessage = error.message;
            } else {
              this.errorMessage = 'Failed to add student. Please check your API.';
            }
            console.error('Error adding student:', error);
          }
        });
    }
  }

  deleteStudent(id: string) {
    this.http.delete(`http://localhost:5000/api/students/${id}`)
      .subscribe(() => {
        this.students = this.students.filter(s => s._id !== id);
        this.filterStudents();
      });
  }

  closeModal() {
    this.showModal = false;
    this.currentStudent = {
      name: '',
      gender: '',
      age: null,
      class: '',
      major: '',
      gmail: '',
      phone: '',
      dob: '',
      placeofbirth: '',
      currentAddress: '',
      grade: '',
      status: ''
    };
  }
}
