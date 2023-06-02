import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KhuVuc } from './khu-vuc';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  messageSource = new BehaviorSubject<any>({});
  currentMessage = this.messageSource.asObservable();
  // có thể subcribe theo dõi thay đổi value của biến này thay cho messageSource

  constructor() { }
 
  // method này để change source message 
  changeMessage(kv:any) {
    this.messageSource.next(kv);
  }
}
