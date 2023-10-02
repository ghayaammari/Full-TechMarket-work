import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrecompteComponent } from './parametrecompte.component';

describe('ParametrecompteComponent', () => {
  let component: ParametrecompteComponent;
  let fixture: ComponentFixture<ParametrecompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrecompteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrecompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
