import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DuAn } from '../du-an';
import { NhanVien } from '../nhan-vien';
import { DetailService } from '../detail.service';
@Component({
  selector: 'app-task-them',
  templateUrl: './task-them.component.html',
  styleUrls: ['./task-them.component.css'],
})
export class TaskThemComponent {
  listDA: DuAn[] = [];
  listNV: NhanVien[] = [];
  frm1!: FormGroup;
  constructor(private projectsService: DetailService, private route: Router) {}
  ngOnInit() {
    this.fetchData();
    this.frm1 = new FormGroup({
      tenTask: new FormControl('', [Validators.required]),
      moTa: new FormControl('', [Validators.required]),
      duAnID: new FormControl('', Validators.required),
      nhanvienID: new FormControl('', Validators.required),
      status: new FormControl(0),
      priority: new FormControl(1),
    });
  }
  fetchData() {
    this.projectsService.getProjects().subscribe((data) => {
      this.listDA = <DuAn[]>data;
    });
    this.projectsService.getNhanVien().subscribe((data) => {
      this.listNV = <NhanVien[]>data;
    });
  }
  createTask(data: any) {
    this.projectsService.createTask(data).subscribe((res) => {
      this.route.navigate(['/dstask']);
    });
  }
}
