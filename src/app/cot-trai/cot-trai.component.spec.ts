import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotTraiComponent } from './cot-trai.component';

describe('CotTraiComponent', () => {
  let component: CotTraiComponent;
  let fixture: ComponentFixture<CotTraiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CotTraiComponent]
    });
    fixture = TestBed.createComponent(CotTraiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
