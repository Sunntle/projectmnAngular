import { Component, OnChanges } from '@angular/core';
import { DetailService } from '../detail.service';
import { DuAn } from '../du-an';
import { NhanVien } from '../nhan-vien';
import { NhiemVu } from '../nhiem-vu';
import { Subscription } from 'rxjs';
import { SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-cot-trai',
  templateUrl: './cot-trai.component.html',
  styleUrls: ['./cot-trai.component.css'],
})
export class CotTraiComponent {
  duan: DuAn[] = [];
  nv: NhanVien[] = [];
  task: NhiemVu[] = [];
  tongTien: number = 0;
  soLuongNV: number = 0;
  soLuongTask: number = 0;
  constructor(private projectService: DetailService) {}
  ngOnInit() {
    this.fetchProject();
    this.fetchNhanVien();
    this.fetchTask();
  }
  fetchProject() {
    this.projectService.getProjects().subscribe((project) => {
      this.duan = <DuAn[]>project;
      this.tongTien = this.duan.reduce(
        (acc: number, cur: DuAn) => acc + +cur.tien,
        0
      );
    });
  }
  fetchNhanVien() {
    this.projectService.getNhanVien().subscribe((NhanVien) => {
      this.nv = <NhanVien[]>NhanVien;
      this.soLuongNV = this.nv.length;
    });
  }
  fetchTask() {
    this.projectService.getTask().subscribe((Task) => {
      this.task = <NhiemVu[]>Task;
      this.soLuongTask = this.task.filter((data) => data.status == 0).length;
    });
  }
  private subscription: Subscription = new Subscription();
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
