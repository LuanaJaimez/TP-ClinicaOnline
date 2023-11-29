import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { UsersComponent } from './users/users.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AdminRequestAppointmentComponent } from './admin-request-appointment/admin-request-appointment.component';
import { AdminWelcomeComponent } from './admin-welcome/admin-welcome.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent,children:[
    {path:'',component:AdminWelcomeComponent, data: {state:  'admin'}},
    {path:'admin-home',component:AdminHomeComponent, data: {state:  'admin-home'}},
    {path:'register-admin',component:AdminRegisterComponent, data: {state:  'register-admin'}},
    {path: 'users', component: UsersComponent, data: {state:  'users'}},
    {path: 'appointments', component: AppointmentsComponent, data: {state:  'appointments'} },
    {path: 'request-appointment-admin', component: AdminRequestAppointmentComponent, data: {state:  'request-appointment-admin'}},
    {path: 'stats', component: StatsComponent, data: {state:  'stats'} },
  ]},
  { path: '**', pathMatch: 'full', component: NotFoundComponent, data: {state:  'not-found'} }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
