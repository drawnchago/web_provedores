import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsBombDialogComponent } from './models-bomb-dialog.component';

describe('ModelsBombDialogComponent', () => {
  let component: ModelsBombDialogComponent;
  let fixture: ComponentFixture<ModelsBombDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelsBombDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsBombDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
