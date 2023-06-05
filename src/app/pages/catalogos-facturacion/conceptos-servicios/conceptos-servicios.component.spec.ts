import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptosServiciosComponent } from './conceptos-servicios.component';

describe('ConceptosServiciosComponent', () => {
  let component: ConceptosServiciosComponent;
  let fixture: ComponentFixture<ConceptosServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptosServiciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptosServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
