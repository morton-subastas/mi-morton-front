import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLoteVentaComponent } from './detalle-lote-venta.component';

describe('DetalleLoteVentaComponent', () => {
  let component: DetalleLoteVentaComponent;
  let fixture: ComponentFixture<DetalleLoteVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleLoteVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleLoteVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
