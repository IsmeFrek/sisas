import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lecturer } from './lecturer';

describe('Lecturer', () => {
  let component: Lecturer;
  let fixture: ComponentFixture<Lecturer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lecturer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lecturer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
