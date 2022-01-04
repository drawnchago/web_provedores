import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSheetsComponent } from './order-sheets.component';

describe('OrderSheetsComponent', () => {
  let component: OrderSheetsComponent;
  let fixture: ComponentFixture<OrderSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSheetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
