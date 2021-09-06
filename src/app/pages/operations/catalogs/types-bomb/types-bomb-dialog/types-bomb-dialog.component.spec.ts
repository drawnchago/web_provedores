import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesBombDialogComponent } from './types-bomb-dialog.component';

describe('TypesBombDialogComponent', () => {
  let component: TypesBombDialogComponent;
  let fixture: ComponentFixture<TypesBombDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesBombDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesBombDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
