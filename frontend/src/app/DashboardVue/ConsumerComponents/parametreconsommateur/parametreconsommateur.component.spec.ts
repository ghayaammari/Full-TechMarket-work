import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreconsommateurComponent } from './parametreconsommateur.component';

describe('ParametreconsommateurComponent', () => {
  let component: ParametreconsommateurComponent;
  let fixture: ComponentFixture<ParametreconsommateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreconsommateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametreconsommateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
