import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebsToPayComponent } from './debs-to-pay.component';

describe('DebsToPayComponent', () => {
  let component: DebsToPayComponent;
  let fixture: ComponentFixture<DebsToPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebsToPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebsToPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
