import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DetailService } from '../detail.service';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { KhuVuc } from '../khu-vuc';
@Component({
  selector: 'app-nv-them',
  templateUrl: './nv-them.component.html',
  styleUrls: ['./nv-them.component.css'],
})
export class NvThemComponent {
  private subscription: Subscription = new Subscription();
  states: KhuVuc[] = [];
  frm1!: FormGroup;
  constructor(
    private projectsService: DetailService,
    private route: Router,
    private dataS: DataService
  ) {}
  ngOnInit() {
    this.fetchData();
    this.frm1 = new FormGroup({
      ho: new FormControl('', [Validators.required]),
      ten: new FormControl('', [Validators.required]),
      ngaysinh: new FormControl('', Validators.required),
      phai: new FormControl(''),
      khuvuc: new FormControl(''),
    });
  }
  fetchData() {
    this.dataS.currentMessage.subscribe((data) => {
      this.states = data[0];
    });
  }
  createNv(data: any) {
    this.projectsService.createNhanVien(data).subscribe((res) => {
      this.route.navigate(['/dsnhanvien']);
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
