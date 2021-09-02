import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesBombComponent } from './types-bomb.component';

describe('TypesBombComponent', () => {
  let component: TypesBombComponent;
  let fixture: ComponentFixture<TypesBombComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesBombComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesBombComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
