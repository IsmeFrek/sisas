import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uers } from './uers';

describe('Uers', () => {
  let component: Uers;
  let fixture: ComponentFixture<Uers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
