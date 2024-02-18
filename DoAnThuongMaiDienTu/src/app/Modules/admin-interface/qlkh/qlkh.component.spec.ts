import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlkhComponent } from './qlkh.component';

describe('QlkhComponent', () => {
  let component: QlkhComponent;
  let fixture: ComponentFixture<QlkhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlkhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlkhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
