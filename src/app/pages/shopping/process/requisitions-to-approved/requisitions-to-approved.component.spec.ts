import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionsToApprovedComponent } from './requisitions-to-approved.component';

describe('RequisitionsToApprovedComponent', () => {
  let component: RequisitionsToApprovedComponent;
  let fixture: ComponentFixture<RequisitionsToApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionsToApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionsToApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
