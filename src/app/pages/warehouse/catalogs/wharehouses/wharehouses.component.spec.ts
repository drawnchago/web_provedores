import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WharehousesComponent } from './wharehouses.component';

describe('WharehousesComponent', () => {
  let component: WharehousesComponent;
  let fixture: ComponentFixture<WharehousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WharehousesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WharehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
