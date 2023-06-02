import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { KhuVuc } from '../khu-vuc';
import { NhanVien } from '../nhan-vien';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cot-phai',
  templateUrl: './cot-phai.component.html',
  styleUrls: ['./cot-phai.component.css'],
})
export class CotPhaiComponent {
  nv: NhanVien[] = [];
  khuVuc: KhuVuc = {};
  constructor(private dataService: DataService) {}
  private subscription: Subscription = new Subscription();
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit() {
    this.dataService.currentMessage.subscribe((el) => {
      this.khuVuc = el[0];
      this.nv = el[1];
    });
  }
  getNV(kv: string) {
    return this.nv.filter((el) => el.khuvuc === kv);
  }
}
