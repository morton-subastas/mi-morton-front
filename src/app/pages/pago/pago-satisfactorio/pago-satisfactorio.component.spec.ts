import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoSatisfactorioComponent } from './pago-satisfactorio.component';

describe('PagoSatisfactorioComponent', () => {
  let component: PagoSatisfactorioComponent;
  let fixture: ComponentFixture<PagoSatisfactorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoSatisfactorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoSatisfactorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
