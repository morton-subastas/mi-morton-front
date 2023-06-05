import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptosFacturaComponent } from './conceptos-factura.component';

describe('ConceptosFacturaComponent', () => {
  let component: ConceptosFacturaComponent;
  let fixture: ComponentFixture<ConceptosFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptosFacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptosFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
