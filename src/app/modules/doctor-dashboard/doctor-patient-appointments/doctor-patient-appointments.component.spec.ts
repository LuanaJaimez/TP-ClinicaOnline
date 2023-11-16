import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPatientAppointmentsComponent } from './doctor-patient-appointments.component';

describe('DoctorPatientAppointmentsComponent', () => {
  let component: DoctorPatientAppointmentsComponent;
  let fixture: ComponentFixture<DoctorPatientAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorPatientAppointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorPatientAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
