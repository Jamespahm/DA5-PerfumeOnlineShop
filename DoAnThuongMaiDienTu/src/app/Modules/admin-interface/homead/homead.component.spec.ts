import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeadComponent } from './homead.component';

describe('HomeadComponent', () => {
  let component: HomeadComponent;
  let fixture: ComponentFixture<HomeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
