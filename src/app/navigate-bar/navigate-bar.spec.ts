import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateBar } from './navigate-bar';

describe('NavigateBar', () => {
  let component: NavigateBar;
  let fixture: ComponentFixture<NavigateBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigateBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigateBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
