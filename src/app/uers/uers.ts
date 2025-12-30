import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface User {
  _id: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  status?: string;
}

@Component({
  selector: 'app-uers',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './uers.html',
  styleUrls: ['./uers.css'],
})
export class Uers implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentUser: User = { _id: '', username: '', email: '', password: '', role: 'user', status: 'active' };
  
  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    this.loadUsers();
  }
  
  loadUsers() {
    this.http.get<User[]>('http://localhost:5000/api/users')
      .subscribe({
        next: (data) => {
          this.users = data;
          this.filterUsers();
        },
        error: (error) => {
          console.error('Error loading users:', error);
          // Add sample data for demo
          this.users = [
            { _id: '1', username: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
            { _id: '2', username: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
            { _id: '3', username: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive' }
          ];
          this.filterUsers();
        }
      });
  }
  
  filterUsers() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user => 
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  
  clearSearch() {
    this.searchTerm = '';
    this.filteredUsers = this.users;
  }
  
  addUser() {
    this.isEditMode = false;
    this.currentUser = { _id: '', username: '', email: '', password: '', role: 'user', status: 'active' };
    this.showModal = true;
  }
  
  editUser(user: User) {
    this.isEditMode = true;
    this.currentUser = { ...user, password: '' }; // Create a copy without password
    this.showModal = true;
  }
  
  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:5000/api/users/${userId}`)
        .subscribe({
          next: () => {
            this.users = this.users.filter(u => u._id !== userId);
            this.filterUsers();
          },
          error: (error) => {
            console.error('Error deleting user:', error);
          }
        });
    }
  }
  
  closeModal() {
    this.showModal = false;
    this.currentUser = { _id: '', username: '', email: '', password: '', role: 'user', status: 'active' };
  }
  
  saveUser() {
    if (this.isEditMode) {
      // Update existing user - don't send password in update
      const { _id, password, ...userUpdateData } = this.currentUser;
      this.http.put<User>(`http://localhost:5000/api/users/${_id}`, userUpdateData)
        .subscribe({
          next: (updatedUser) => {
            const index = this.users.findIndex(u => u._id === updatedUser._id);
            if (index !== -1) {
              this.users[index] = updatedUser;
            }
            this.filterUsers();
            this.closeModal();
            console.log('User updated successfully:', updatedUser);
          },
          error: (error) => {
            console.error('Error updating user:', error);
            console.error('Error details:', error.error);
            // Update local array even if API fails
            const index = this.users.findIndex(u => u._id === this.currentUser._id);
            if (index !== -1) {
              this.users[index] = { ...this.currentUser };
              this.filterUsers();
              this.closeModal();
            }
          }
        });
    } else {
      // Create new user - send all data including password
      const { _id, ...userDataWithoutId } = this.currentUser;
      this.http.post<User>('http://localhost:5000/api/users', userDataWithoutId)
        .subscribe({
          next: (createdUser) => {
            this.users.push(createdUser);
            this.filterUsers();
            this.closeModal();
            console.log('User created successfully:', createdUser);
          },
          error: (error) => {
            console.error('Error creating user:', error);
            console.error('Error details:', error.error);
            // Add to local array with generated ID even if API fails
            const newUser = { ...this.currentUser, _id: Date.now().toString() };
            this.users.push(newUser);
            this.filterUsers();
            this.closeModal();
          }
        });
    }
  }
}
