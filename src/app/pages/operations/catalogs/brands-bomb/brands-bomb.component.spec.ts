import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsBombsComponent } from './brands-bomb.component';

describe('BrandsBombsComponent', () => {
  let component: BrandsBombsComponent;
  let fixture: ComponentFixture<BrandsBombsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandsBombsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsBombsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
