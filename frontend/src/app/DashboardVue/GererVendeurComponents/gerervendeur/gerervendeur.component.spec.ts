import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerervendeurComponent } from './gerervendeur.component';

describe('GerervendeurComponent', () => {
  let component: GerervendeurComponent;
  let fixture: ComponentFixture<GerervendeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerervendeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerervendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
