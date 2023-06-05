import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodosPagosComponent } from './metodos-pagos.component';

describe('MetodosPagosComponent', () => {
  let component: MetodosPagosComponent;
  let fixture: ComponentFixture<MetodosPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetodosPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodosPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
