import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientDashboardRoutingModule } from './patient-dashboard-routing.module';
import { PatientDashboardComponent } from './patient-dashboard.component';
import { PatientHomeComponent } from './patient-home/patient-home.component';
import { SharedModule } from 'src/app/components/common-module/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientRequestAppointmentComponent } from './patient-request-appointment/patient-request-appointment.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { PatientOwnAppointmentComponent } from './patient-own-appointment/patient-own-appointment.component';

@NgModule({
  declarations: [
    PatientDashboardComponent,
    PatientHomeComponent,
    PatientRequestAppointmentComponent,
    MyAppointmentsComponent,
    PatientOwnAppointmentComponent
  ],
  imports: [
    CommonModule,
    PatientDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PatientDashboardModule { }
