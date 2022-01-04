import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFormatComponent } from './work-format.component';

describe('WorkFormatComponent', () => {
  let component: WorkFormatComponent;
  let fixture: ComponentFixture<WorkFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
