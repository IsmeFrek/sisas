  import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface ClassModel {
  _id?: string;
  name: string;
  description?: string;
  promotion?: string;
  year?: number;
}

@Component({
  selector: 'app-class',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './class.html',
  styleUrls: ['./class.css']
})
export class Class {
  classes: ClassModel[] = [];
  newClass: ClassModel = { name: '', description: '', promotion: '', year: new Date().getFullYear() };
  editingClass: ClassModel | null = null;
  showAddForm: boolean = false;
  private apiUrl = 'http://localhost:5000/api/class';

  constructor(private http: HttpClient) {
    this.loadClasses();
  }

  loadClasses() {
    this.http.get<ClassModel[]>(this.apiUrl).subscribe(data => {
      this.classes = data;
    });
  }

  addClass() {
    this.http.post<ClassModel>(this.apiUrl, this.newClass).subscribe(() => {
      this.newClass = { name: '', description: '', promotion: '', year: new Date().getFullYear() };
      this.loadClasses();
      this.closeModal();
    });
  }

  editClass(cls: ClassModel) {
    this.editingClass = { ...cls };
  }

  updateClass() {
    if (this.editingClass && this.editingClass._id) {
      this.http.put<ClassModel>(`${this.apiUrl}/${this.editingClass._id}`, this.editingClass).subscribe(() => {
        this.editingClass = null;
        this.loadClasses();
      });
    }
  }

  deleteClass(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.loadClasses();
    });
  }

  cancelEdit() {
    this.editingClass = null;
  }

  closeModal() {
    this.showAddForm = false;
    this.newClass = { name: '', description: '', promotion: '', year: new Date().getFullYear() };
  }
}
