import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'asm1';
  private subscription: Subscription = new Subscription();
  constructor(private data: DataService) {}

  getData(content: string) {
    let text: any[] = [];
    this.subscription = this.data.currentMessage.subscribe((el) => {
      if (el[2] == undefined) {
        text = [...el, content];
      } else if (el[2] !== content) {
        el[2] = content;
        text = [...el];
      }
    });
    this.data.changeMessage(text);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
