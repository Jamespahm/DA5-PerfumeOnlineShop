import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIvoiceComponent } from './edit-ivoice.component';

describe('EditIvoiceComponent', () => {
  let component: EditIvoiceComponent;
  let fixture: ComponentFixture<EditIvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
