import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreboutiqueComponent } from './parametreboutique.component';

describe('ParametreboutiqueComponent', () => {
  let component: ParametreboutiqueComponent;
  let fixture: ComponentFixture<ParametreboutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreboutiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametreboutiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
