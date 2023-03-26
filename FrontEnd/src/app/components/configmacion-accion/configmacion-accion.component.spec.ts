import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigmacionAccionComponent } from './configmacion-accion.component';

describe('ConfigmacionAccionComponent', () => {
  let component: ConfigmacionAccionComponent;
  let fixture: ComponentFixture<ConfigmacionAccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigmacionAccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigmacionAccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
