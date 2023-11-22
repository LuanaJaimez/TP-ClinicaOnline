import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CommonModules } from './common-routing.module';
import { CommonModuleComponent } from './common.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { UserTypePipe } from 'src/app/pipes/userType.pipe';
import { CaptchaComponent } from './captcha/captcha.component';
import { UserNamePipe } from 'src/app/pipes/userrName.pipe';
import { ChartistModule } from "ng-chartist";
import { RequestAppointmentComponent } from './request-appointment/request-appointment.component';
import { ServiceHoursPipe } from 'src/app/pipes/serviceHours.pipe';
import { SpecialtiesPipe } from 'src/app/pipes/specialties.pipe';
import { AppointmentStatusPipe } from 'src/app/pipes/appointmentStatus.pipe';
import { RequestAppointmentSpecialtyComponent } from './request-appointment-specialty/request-appointment-specialty.component';
import { RequestAppointmentDoctorComponent } from './request-appointment-doctor/request-appointment-doctor.component';
import { RequestAppointmentDateComponent } from './request-appointment-date/request-appointment-date.component';
import { RequestAppointmentPatientComponent } from './request-appointment-patient/request-appointment-patient.component';
import { Captcha2Directive } from 'src/app/directives/captcha2.directive';

@NgModule({
  declarations: [
    CommonModuleComponent, 
    NavbarComponent,
    ProfileComponent,
    UserTypePipe,
    UserNamePipe,
    CaptchaComponent,
    RequestAppointmentComponent,
    ServiceHoursPipe,
    SpecialtiesPipe,
    AppointmentStatusPipe,
    RequestAppointmentSpecialtyComponent,
    RequestAppointmentDoctorComponent,
    RequestAppointmentDateComponent,
    RequestAppointmentPatientComponent,
    Captcha2Directive
  ],
  imports: [
    CommonModule,
    FormsModule,
    CommonModules,
    ChartistModule
  ],
  exports: [
    CommonModuleComponent,
    NavbarComponent,
    ProfileComponent,
    CaptchaComponent,
    UserNamePipe,
    UserTypePipe,
    ChartistModule,
    RequestAppointmentComponent,
    AppointmentStatusPipe,
    Captcha2Directive
  ],
  providers: [
    SpecialtiesPipe,
    DatePipe
  ]
})
export class SharedModule { }
