import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsBombDialogComponent } from './brands-bomb-dialog.component';

describe('BrandsBombDialogComponent', () => {
  let component: BrandsBombDialogComponent;
  let fixture: ComponentFixture<BrandsBombDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandsBombDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsBombDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
