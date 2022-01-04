import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrySheetsComponent } from './entry-sheets.component';

describe('EntrySheetsComponent', () => {
  let component: EntrySheetsComponent;
  let fixture: ComponentFixture<EntrySheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrySheetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrySheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
