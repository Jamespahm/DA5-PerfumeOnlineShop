import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIvoiceComponent } from './add-ivoice.component';

describe('AddIvoiceComponent', () => {
  let component: AddIvoiceComponent;
  let fixture: ComponentFixture<AddIvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
