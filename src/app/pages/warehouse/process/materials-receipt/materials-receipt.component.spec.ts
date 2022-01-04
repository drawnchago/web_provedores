import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsReceiptComponent } from './materials-receipt.component';

describe('MaterialsReceiptComponent', () => {
  let component: MaterialsReceiptComponent;
  let fixture: ComponentFixture<MaterialsReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialsReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialsReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
