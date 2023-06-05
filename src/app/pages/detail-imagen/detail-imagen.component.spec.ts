import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailImagenComponent } from './detail-imagen.component';

describe('DetailImagenComponent', () => {
  let component: DetailImagenComponent;
  let fixture: ComponentFixture<DetailImagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailImagenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
