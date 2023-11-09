import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorDashboardRoutingModule } from './doctor-dashboard-routing.module';
import { DoctorDashboardComponent } from './doctor-dashboard.component';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { SharedModule } from 'src/app/components/common-module/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientsComponent } from './patients/patients.component';

@NgModule({
  declarations: [
    DoctorDashboardComponent,
    DoctorHomeComponent,
    PatientsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DoctorDashboardRoutingModule,
    SharedModule
  ]
})
export class DoctorDashboardModule { }
