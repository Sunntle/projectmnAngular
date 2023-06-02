import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietDuAnComponent } from './chi-tiet-du-an.component';

describe('ChiTietDuAnComponent', () => {
  let component: ChiTietDuAnComponent;
  let fixture: ComponentFixture<ChiTietDuAnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietDuAnComponent]
    });
    fixture = TestBed.createComponent(ChiTietDuAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
