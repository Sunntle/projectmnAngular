import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { NhiemVu } from '../nhiem-vu';
import { DetailService } from '../detail.service';
import { NhanVien } from '../nhan-vien';
import { Subscription } from 'rxjs';
import { DuAn } from '../du-an';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  listTask: NhiemVu[] = [];
  listNv: NhanVien[] = [];
  listDa: DuAn[] = [];
  frm1!: FormGroup;
  task: NhiemVu = <NhiemVu>{};
  private subscription: Subscription = new Subscription();
  constructor(private projectService: DetailService) {}
  ngOnInit() {
    this.frm1 = new FormGroup({
      id: new FormControl(''),
      tenTask: new FormControl(''),
      duAnID: new FormControl(''),
      nhanvienID: new FormControl(''),
      moTa: new FormControl(''),
      status: new FormControl(''),
      priority: new FormControl(''),
    });
    this.fetchData();
  }
  fetchData() {
    this.projectService.getTask().subscribe((data) => {
      this.listTask = <NhiemVu[]>data;
    });
    this.projectService.getNhanVien().subscribe((data) => {
      this.listNv = <NhanVien[]>data;
    });
    this.projectService.getProjects().subscribe((data) => {
      this.listDa = <DuAn[]>data;
    });
  }
  getData(id: number) {
    this.task = this.listTask.find((el) => el.id === id)!;
    this.frm1.patchValue({
      id: this.task.id,
      tenTask: this.task.tenTask,
      duAnID: this.task.duAnID,
      nhanvienID: this.task.nhanvienID,
      moTa: this.task.moTa,
      status: this.task.status,
      priority: this.task.priority,
    });
  }
  success(id: number) {
    this.task = this.listTask.find((el) => el.id === id)!;
    if (this.task.status == 0) {
      this.task.status = 1;
      this.projectService.updateTask(this.task).subscribe((res) => {
        this.fetchData();
      });
    } else {
      if (confirm('Xoá hả')) {
        this.projectService.deleteTask(id).subscribe((res) => {
          this.fetchData();
        });
      }
    }
  }
  postData(data: any) {
    this.projectService.updateTask(data).subscribe((res) => {
      const btnClose = document.querySelector(
        'button[data-bs-dismiss="modal"]'
      ) as HTMLElement;
      btnClose.click();
      this.fetchData();
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
