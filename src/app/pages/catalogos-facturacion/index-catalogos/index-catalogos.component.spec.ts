import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCatalogosComponent } from './index-catalogos.component';

describe('IndexCatalogosComponent', () => {
  let component: IndexCatalogosComponent;
  let fixture: ComponentFixture<IndexCatalogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCatalogosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCatalogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
