import { Component } from '@angular/core';
import { NhanVien } from '../nhan-vien';
import { DetailService } from '../detail.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-duan-them',
  templateUrl: './duan-them.component.html',
  styleUrls: ['./duan-them.component.css'],
})
export class DuanThemComponent {
  private subscription: Subscription = new Subscription();
  listNhanVien: NhanVien[] = [];
  frm1!: FormGroup;
  constructor(private projectsService: DetailService, private route: Router) {}
  ngOnInit() {
    this.projectsService.getNhanVien().subscribe((data) => {
      this.listNhanVien = <NhanVien[]>data;
    });
    this.frm1 = new FormGroup({
      tenDuAn: new FormControl('', [
        Validators.minLength(3),
        Validators.required,
      ]),
      ngayStart: new FormControl('', Validators.required),
      tien: new FormControl(0, [Validators.min(0)]),
      leader: new FormControl('', Validators.required),
      thanhvien: new FormControl(''),
    });
  }
  createDA(data: any) {
    data.leader = +data.leader;
    this.projectsService.createProject(data).subscribe(
      (res) => {
        this.route.navigate(['/danhsachduan']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
