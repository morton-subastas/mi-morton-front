import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsosComponent } from './usos.component';

describe('UsosComponent', () => {
  let component: UsosComponent;
  let fixture: ComponentFixture<UsosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
