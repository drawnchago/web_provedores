import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPieceDialogComponent } from './add-piece-dialog.component';

describe('AddPieceDialogComponent', () => {
  let component: AddPieceDialogComponent;
  let fixture: ComponentFixture<AddPieceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPieceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPieceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
