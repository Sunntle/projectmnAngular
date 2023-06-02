import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotPhaiComponent } from './cot-phai.component';

describe('CotPhaiComponent', () => {
  let component: CotPhaiComponent;
  let fixture: ComponentFixture<CotPhaiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CotPhaiComponent]
    });
    fixture = TestBed.createComponent(CotPhaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
