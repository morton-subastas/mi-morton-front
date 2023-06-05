import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoInsatisfactorioComponent } from './pago-insatisfactorio.component';

describe('PagoInsatisfactorioComponent', () => {
  let component: PagoInsatisfactorioComponent;
  let fixture: ComponentFixture<PagoInsatisfactorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoInsatisfactorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoInsatisfactorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
