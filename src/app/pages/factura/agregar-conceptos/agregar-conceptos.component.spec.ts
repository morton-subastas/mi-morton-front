import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarConceptosComponent } from './agregar-conceptos.component';

describe('AgregarConceptosComponent', () => {
  let component: AgregarConceptosComponent;
  let fixture: ComponentFixture<AgregarConceptosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarConceptosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarConceptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
