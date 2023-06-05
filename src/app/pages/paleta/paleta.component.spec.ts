import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletaComponent } from './paleta.component';

describe('PaletaComponent', () => {
  let component: PaletaComponent;
  let fixture: ComponentFixture<PaletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaletaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
