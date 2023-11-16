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

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminHomeComponent,
    AdminRegisterComponent,
    UsersComponent,
    AdminRequestAppointmentComponent,
    AppointmentsComponent,
    AdminWelcomeComponent
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
