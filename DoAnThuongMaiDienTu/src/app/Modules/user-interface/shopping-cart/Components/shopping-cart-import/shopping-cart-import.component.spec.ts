import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartImportComponent } from './shopping-cart-import.component';

describe('ShoppingCartImportComponent', () => {
  let component: ShoppingCartImportComponent;
  let fixture: ComponentFixture<ShoppingCartImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
