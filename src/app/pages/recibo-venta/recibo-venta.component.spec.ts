import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboVentaComponent } from './recibo-venta.component';

describe('ReciboVentaComponent', () => {
  let component: ReciboVentaComponent;
  let fixture: ComponentFixture<ReciboVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciboVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciboVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
