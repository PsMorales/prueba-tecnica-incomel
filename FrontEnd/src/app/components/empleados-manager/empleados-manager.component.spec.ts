import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosManagerComponent } from './empleados-manager.component';

describe('EmpleadosManagerComponent', () => {
  let component: EmpleadosManagerComponent;
  let fixture: ComponentFixture<EmpleadosManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadosManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
