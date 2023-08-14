import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaUnConceptoComponent } from './factura-un-concepto.component';

describe('FacturaUnConceptoComponent', () => {
  let component: FacturaUnConceptoComponent;
  let fixture: ComponentFixture<FacturaUnConceptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaUnConceptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaUnConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
