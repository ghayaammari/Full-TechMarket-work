import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaSelectionComponent } from './ma-selection.component';

describe('MaSelectionComponent', () => {
  let component: MaSelectionComponent;
  let fixture: ComponentFixture<MaSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
