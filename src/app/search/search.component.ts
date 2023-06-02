import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { DetailService } from '../detail.service';
import { DuAn } from '../du-an';
import { Subscription } from 'rxjs';
import { NhiemVu } from '../nhiem-vu';
import { NhanVien } from '../nhan-vien';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchContent: string = '';
  listDA: DuAn[] = [];
  listTask: NhiemVu[] = [];
  searchDA: DuAn[] = [];
  searchTask: NhiemVu[] = [];
  listNV: NhanVien[] = [];
  searchNV: NhanVien[] = [];
  dataDA: DuAn = {
    id: 0,
    tenDuAn: '',
    ngayStart: '',
    tien: 0,
    leader: 0,
    thanhvien: [],
  };
  constructor(private data: DataService, private project: DetailService) {}
  private subscription: Subscription = new Subscription();
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit() {
    this.data.currentMessage.subscribe((data) => {
      this.searchContent = data[2];
      if (this.searchContent !== undefined) {
        this.fetchDA(this.searchContent);
        this.fetchTask(this.searchContent);
        this.fetchNV(this.searchContent);
      }
    });
  }
  fetchDA(text: string): any {
    this.project.getProjects().subscribe((data) => {
      this.listDA = <DuAn[]>data;
      this.searchDA = this.listDA.filter((el) =>
        el.tenDuAn.toLowerCase().includes(text.toLowerCase())
      );
    });
  }
  fetchTask(text: string): any {
    this.project.getTask().subscribe((data) => {
      this.listTask = <NhiemVu[]>data;
      this.searchTask = this.listTask.filter((el) =>
        el.tenTask.toLowerCase().includes(text.toLowerCase())
      );
    });
  }
  fetchNV(text: string): any {
    this.project.getNhanVien().subscribe((data) => {
      this.listNV = <NhanVien[]>data;
      this.searchNV = this.listNV.filter((el) =>
        (el.ho + ' ' + el.ten).toLowerCase().includes(text.toLowerCase())
      );
    });
  }
  getData(id: number) {
    this.dataDA = this.listDA.find((el) => el.id === id)!;
  }
  getNVTask(id: number) {
    const nameNVTask = this.listNV.find((el) => el.id === id);
    return nameNVTask?.ho + ' ' + nameNVTask?.ten;
  }
  getDATask(id: number) {
    const nameDATask = this.listDA.find((el) => el.id === id);
    return nameDATask?.tenDuAn;
  }
}
