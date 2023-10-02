import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedPasswordComponent } from './confirmed-password.component';

describe('ConfirmedPasswordComponent', () => {
  let component: ConfirmedPasswordComponent;
  let fixture: ComponentFixture<ConfirmedPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmedPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmedPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
