import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LugaresExpedicionComponent } from './lugares-expedicion.component';

describe('LugaresExpedicionComponent', () => {
  let component: LugaresExpedicionComponent;
  let fixture: ComponentFixture<LugaresExpedicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LugaresExpedicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LugaresExpedicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
