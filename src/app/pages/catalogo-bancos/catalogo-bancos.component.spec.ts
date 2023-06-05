import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoBancosComponent } from './catalogo-bancos.component';

describe('CatalogoBancosComponent', () => {
  let component: CatalogoBancosComponent;
  let fixture: ComponentFixture<CatalogoBancosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoBancosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoBancosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
