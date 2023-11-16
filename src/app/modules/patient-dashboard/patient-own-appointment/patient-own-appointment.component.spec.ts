import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientOwnAppointmentComponent } from './patient-own-appointment.component';

describe('PatientOwnAppointmentComponent', () => {
  let component: PatientOwnAppointmentComponent;
  let fixture: ComponentFixture<PatientOwnAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientOwnAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientOwnAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
