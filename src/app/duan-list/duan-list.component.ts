import { Component } from '@angular/core';
import { DuAn } from '../du-an';
import { DetailService } from '../detail.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { NhanVien } from '../nhan-vien';
@Component({
  selector: 'app-duan-list',
  templateUrl: './duan-list.component.html',
  styleUrls: ['./duan-list.component.css'],
})
export class DuanListComponent {
  dataDA: DuAn = {
    id: 0,
    tenDuAn: '',
    ngayStart: '',
    tien: 0,
    leader: 0,
    thanhvien: [],
  };
  listDuAn: DuAn[] = [];
  frm1!: FormGroup;
  listNv: NhanVien[] = [];
  private subscription: Subscription = new Subscription();
  constructor(private projectsService: DetailService) {}
  ngOnInit() {
    this.frm1 = new FormGroup({
      id: new FormControl(''),
      tenDuAn: new FormControl(''),
      ngayStart: new FormControl(''),
      tien: new FormControl(''),
      leader: new FormControl(''),
      thanhvien: new FormControl(''),
    });
    this.fetchData();
  }
  fetchData() {
    this.projectsService.getProjects().subscribe((data) => {
      this.listDuAn = <DuAn[]>data;
    });
  }
  getData(id: number) {
    this.dataDA = this.listDuAn.find((el) => el.id === id)!;
    this.projectsService.getNhanVien().subscribe((data) => {
      this.listNv = <NhanVien[]>data;
      this.frm1.patchValue({
        id: this.dataDA.id,
        tenDuAn: this.dataDA.tenDuAn,
        ngayStart: formatDate(this.dataDA.ngayStart, 'yyyy-MM-dd', 'vi-VN'),
        tien: this.dataDA.tien,
        leader: this.dataDA.leader,
        thanhvien: this.dataDA.thanhvien,
      });
    });
  }
  getValueSort(event: any) {
    const selectValue = +event.target.value;
    switch (selectValue) {
      case 1:
        this.sortArr(this.listDuAn, 'min', 'date');
        break;
      case 2:
        this.sortArr(this.listDuAn, 'max', 'date');
        break;
      case 3:
        this.sortArr(this.listDuAn, 'min', 'price');
        break;
      case 4:
        this.sortArr(this.listDuAn, 'max', 'price');
        break;
      default:
        this.sortArr(this.listDuAn, '', '');
        break;
    }
  }
  sortArr(arr: DuAn[], status: string, sortBy: string) {
    arr.sort((a, b) => {
      let a1 = 0;
      let a2 = 0;
      if (sortBy == 'date') {
        a1 = new Date(a.ngayStart).valueOf();
        a2 = new Date(b.ngayStart).valueOf();
      } else if (sortBy == 'price') {
        a1 = a.tien;
        a2 = b.tien;
      } else {
        a1 = a.id;
        a2 = b.id;
      }
      let result = a1 - a2;
      if (status == 'max') {
        result = a2 - a1;
      }
      return result;
    });
    return arr;
  }
  postData(data: DuAn) {
    this.projectsService.updateProject(data).subscribe(
      (res) => {
        const btnClose = document.querySelector(
          'button[data-bs-dismiss="modal"]'
        ) as HTMLElement;
        btnClose.click();
        this.fetchData();
      },
      (err) => console.log(err)
    );
  }
  deleteData(id: number) {
    if (confirm('Xóa dự án này nhé ?')) {
      this.projectsService.deleteProject(id).subscribe(
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
