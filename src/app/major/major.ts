import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface MajorModel {
  _id?: string;
  name: string;
  description?: string;
}

@Component({
  selector: 'app-major',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './major.html',
  styleUrl: './major.css',
})
export class Major {
  majors: MajorModel[] = [];
  newMajor: MajorModel = { name: '', description: '' };
  editingMajor: MajorModel | null = null;
  showAddForm: boolean = false;
  private apiUrl = 'http://localhost:5000/api/major';

  constructor(private http: HttpClient) {
    this.loadMajors();
  }

  loadMajors() {
    this.http.get<MajorModel[]>(this.apiUrl).subscribe(data => {
      this.majors = data;
    });
  }

  addMajor() {
    this.http.post<MajorModel>(this.apiUrl, this.newMajor).subscribe(() => {
      this.newMajor = { name: '', description: '' };
      this.loadMajors();
      this.closeModal();
    });
  }

  editMajor(major: MajorModel) {
    this.editingMajor = { ...major };
  }

  updateMajor() {
    if (this.editingMajor && this.editingMajor._id) {
      this.http.put<MajorModel>(`${this.apiUrl}/${this.editingMajor._id}`, this.editingMajor).subscribe(() => {
        this.editingMajor = null;
        this.loadMajors();
      });
    }
  }

  deleteMajor(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.loadMajors();
    });
  }

  cancelEdit() {
    this.editingMajor = null;
  }

  closeModal() {
    this.showAddForm = false;
    this.newMajor = { name: '', description: '' };
  }
}
