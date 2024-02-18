import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlhdComponent } from './qlhd.component';

describe('QlhdComponent', () => {
  let component: QlhdComponent;
  let fixture: ComponentFixture<QlhdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlhdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlhdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
