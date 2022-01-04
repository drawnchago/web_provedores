import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitSheetsComponent } from './exit-sheets.component';

describe('ExitSheetsComponent', () => {
  let component: ExitSheetsComponent;
  let fixture: ComponentFixture<ExitSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitSheetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
