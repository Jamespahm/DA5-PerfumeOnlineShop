import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIvoicedetailComponent } from './edit-ivoicedetail.component';

describe('EditIvoicedetailComponent', () => {
  let component: EditIvoicedetailComponent;
  let fixture: ComponentFixture<EditIvoicedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIvoicedetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIvoicedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
