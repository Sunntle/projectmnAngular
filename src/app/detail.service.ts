import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DuAn } from './du-an';
import { NhanVien } from './nhan-vien';
import { NhiemVu } from './nhiem-vu';
@Injectable({
  providedIn: 'root',
})
export class DetailService {
  constructor(private http: HttpClient) {}
  getProjects() {
    return this.http.get('http://localhost:3000/DuAn/');
  }
  getProjectsByID(id: number) {
    return this.http.get('http://localhost:3000/DuAn/' + id);
  }
  createProject(project: DuAn) {
    return this.http.post('http://localhost:3000/DuAn/', project);
  }

  updateProject(project: DuAn) {
    return this.http.put('http://localhost:3000/DuAn/' + project.id, project);
  }

  deleteProject(id: number) {
    return this.http.delete('http://localhost:3000/DuAn/' + id);
  }

  getNhanVien() {
    return this.http.get('http://localhost:3000/NhanVien/');
  }
  getNhanVienByID(id: number) {
    return this.http.get('http://localhost:3000/NhanVien/' + id);
  }
  createNhanVien(project: NhanVien) {
    return this.http.post('http://localhost:3000/NhanVien/', project);
  }

  updateNhanVien(project: NhanVien) {
    return this.http.put('http://localhost:3000/NhanVien/' + project.id, project);
  }

  deleteNhanVien(id: number) {
    return this.http.delete('http://localhost:3000/NhanVien/' + id);
  }

  getTask() {
    return this.http.get('http://localhost:3000/Task/');
  }
  getTaskByID(id: number) {
    return this.http.get('http://localhost:3000/Task/' + id);
  }
  createTask(project: NhiemVu) {
    return this.http.post('http://localhost:3000/Task/', project);
  }

  updateTask(project: NhiemVu) {
    return this.http.put('http://localhost:3000/Task/' + project.id, project);
  }

  deleteTask(id: number) {
    return this.http.delete('http://localhost:3000/Task/' + id);
  }
}
