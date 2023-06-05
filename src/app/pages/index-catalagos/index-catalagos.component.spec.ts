import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCatalagosComponent } from './index-catalagos.component';

describe('IndexCatalagosComponent', () => {
  let component: IndexCatalagosComponent;
  let fixture: ComponentFixture<IndexCatalagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCatalagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCatalagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
