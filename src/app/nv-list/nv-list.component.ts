import { Component } from '@angular/core';
import { NhanVien } from '../nhan-vien';
import { DetailService } from '../detail.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { DataService } from '../data.service';
import { KhuVuc } from '../khu-vuc';
@Component({
  selector: 'app-nv-list',
  templateUrl: './nv-list.component.html',
  styleUrls: ['./nv-list.component.css'],
})
export class NvListComponent {
  frm1!: FormGroup;
  listNv: NhanVien[] = [];
  nhanVien: NhanVien = <NhanVien>{};
  states: KhuVuc[] = [];
  private subscription: Subscription = new Subscription();
  constructor(
    private projectsService: DetailService,
    private dataS: DataService
  ) {}
  ngOnInit() {
    this.frm1 = new FormGroup({
      id: new FormControl(''),
      ho: new FormControl(''),
      ten: new FormControl(''),
      ngaysinh: new FormControl(''),
      phai: new FormControl(''),
      khuvuc: new FormControl(''),
    });
    this.fetchData();
  }
  fetchData() {
    this.projectsService.getNhanVien().subscribe((data) => {
      this.listNv = <NhanVien[]>data;
    });
    this.dataS.currentMessage.subscribe((data) => {
      this.states = data[0];
    });
  }
  postData(data: any) {
    this.projectsService.updateNhanVien(data).subscribe((res) => {
      const btnClose = document.querySelector(
        'button[data-bs-dismiss="modal"]'
      ) as HTMLElement;
      btnClose.click();
      this.fetchData();
    });
  }
  getData(id: number) {
    this.nhanVien = this.listNv.find((el) => el.id === id)!;
    this.frm1.patchValue({
      id: this.nhanVien.id,
      ho: this.nhanVien.ho,
      ten: this.nhanVien.ten,
      ngaysinh: formatDate(this.nhanVien.ngaysinh, 'yyyy-MM-dd', 'vi-VN'),
      phai: this.nhanVien.phai,
      khuvuc: this.nhanVien.khuvuc,
    });
  }
  deleteData(id: number) {
    if (confirm('Xóa nhân viên này nhé ?')) {
      this.projectsService.deleteNhanVien(id).subscribe(
        (res) => {
          this.fetchData();
        },
        (err) => console.log(err)
      );
    }
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
