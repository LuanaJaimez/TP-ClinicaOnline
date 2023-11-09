import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent,children:[
    {path:'',component:AdminHomeComponent, data: {state:  'admin'}},
    {path:'register-admin',component:AdminRegisterComponent, data: {state:  'register-admin'}},
    {path: 'users', component: UsersComponent, data: {state:  'users'} },
  ]},
  { path: '**', pathMatch: 'full', component: NotFoundComponent, data: {state:  'not-found'} }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
