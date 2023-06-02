import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DetailService } from '../detail.service';
import { DuAn } from '../du-an';
import { NhanVien } from '../nhan-vien';
import { KhuVuc } from '../khu-vuc';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  duan: DuAn[] = [];
  nv: NhanVien[] = [];
  dskhuVuc: string[] = [];
  nvkhuVuc: KhuVuc = {};
  tongTien: number = 0;
  soLuongNV: number = 0;
  private subscription: Subscription = new Subscription();
  constructor(
    private projectService: DetailService,
    private dataService: DataService
  ) {}
  ngOnInit() {
    this.fetchProject();
    this.fetchNhanVien();
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
      this.dskhuVuc = this.nv.reduce((acc: string[], cur: NhanVien) => {
        if (acc.filter((el) => el !== cur.khuvuc)) {
          acc.push(cur.khuvuc);
        }
        return acc;
      }, []);

      this.nvkhuVuc = this.dskhuVuc.reduce((result: KhuVuc, value) => {
        result[value] = 0;
        return result;
      }, {});
      for (const key in this.nvkhuVuc) {
        this.nv.forEach((el) => {
          if (el.khuvuc === key) this.nvkhuVuc[key]++;
        });
      }
      this.createMessage([this.nvkhuVuc, this.nv]);
    });
  }
  createMessage(kv: any) {
    this.dataService.changeMessage(kv);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
