import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposComprobantesComponent } from './tipos-comprobantes.component';

describe('TiposComprobantesComponent', () => {
  let component: TiposComprobantesComponent;
  let fixture: ComponentFixture<TiposComprobantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposComprobantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposComprobantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
