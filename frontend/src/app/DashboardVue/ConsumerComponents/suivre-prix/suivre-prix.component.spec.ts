import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivrePrixComponent } from './suivre-prix.component';

describe('SuivrePrixComponent', () => {
  let component: SuivrePrixComponent;
  let fixture: ComponentFixture<SuivrePrixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuivrePrixComponent]
    });
    fixture = TestBed.createComponent(SuivrePrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
