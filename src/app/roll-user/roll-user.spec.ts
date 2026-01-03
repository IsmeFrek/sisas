import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollUser } from './roll-user';

describe('RollUser', () => {
  let component: RollUser;
  let fixture: ComponentFixture<RollUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RollUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
