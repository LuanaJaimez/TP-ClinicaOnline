import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SharedModule } from 'src/app/components/common-module/common.module';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { UsersComponent } from './users/users.component';
import { AdminRequestAppointmentComponent } from './admin-request-appointment/admin-request-appointment.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AdminWelcomeComponent } from './admin-welcome/admin-welcome.component';
import { StatsComponent } from './stats/stats.component';
import { AppointmentsDoctorComponent } from './stats/appointments-doctor/appointments-doctor.component';
import { LogsComponent } from './stats/logs/logs.component';
import { AppointmentsSpecialtyComponent } from './stats/appointments-specialty/appointments-specialty.component';
import { AppointmentsDayComponent } from './stats/appointments-day/appointments-day.component';
import { AppointmentsEndedComponent } from './stats/appointments-ended/appointments-ended.component';
import { ButtonEffectDirective } from 'src/app/directives/button-effect.directive';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminHomeComponent,
    AdminRegisterComponent,
    UsersComponent,
    AdminRequestAppointmentComponent,
    AppointmentsComponent,
    AdminWelcomeComponent,
    StatsComponent,
    LogsComponent,
    AppointmentsDoctorComponent,
    AppointmentsSpecialtyComponent,
    AppointmentsDayComponent,
    AppointmentsEndedComponent,
    ButtonEffectDirective,
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule,
  ]
})
export class AdminDashboardModule { }
