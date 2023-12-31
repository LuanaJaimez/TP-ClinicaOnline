import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificationComponent } from './components/verification/verification.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AdminGuard } from './guards/admin.guard';
import { PatientGuard } from './guards/patient.guard';
import { DoctorGuard } from './guards/doctor.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['admin']);

const routes: Routes = [
  { 
    path: '', 
    ...canActivate(redirectLoggedInToHome),
    loadChildren: () => import('./modules/login/login.module')
    .then(m => m.LoginModule),
    
  },
  { 
    path: 'login', 
    ...canActivate(redirectLoggedInToHome),
    loadChildren: () => import('./modules/login/login.module')
    .then(m => m.LoginModule),
    
  },
  { 
    path: 'register', 
    ...canActivate(redirectLoggedInToHome),
    loadChildren: () => import('./modules/register/register.module')
    .then(m => m.RegisterModule),
    
  },
  { 
    path: 'admin', 
    ...canActivate(redirectUnauthorizedToLogin),
    canActivate: [AdminGuard],
    data: {state:  'admin'},
    loadChildren: () => import('./modules/admin-dashboard/admin-dashboard.module')
    .then(m => m.AdminDashboardModule),
    
  },
  { 
    path: 'doctor', 
    ...canActivate(redirectUnauthorizedToLogin),
    canActivate: [DoctorGuard],
    data: {state:  'doctor'},
    loadChildren: () => import('./modules/doctor-dashboard/doctor-dashboard.module')
    .then(m => m.DoctorDashboardModule),
    
  },
  { 
    path: 'patient', 
    ...canActivate(redirectUnauthorizedToLogin),
    canActivate: [PatientGuard],
    data: {state:  'patient'},
    loadChildren: () => import('./modules/patient-dashboard/patient-dashboard.module')
    .then(m => m.PatientDashboardModule),
    
  },
  {
    path: 'verification',
    component: VerificationComponent,
    ...canActivate(redirectUnauthorizedToLogin),
    data: {state:  'verification'}
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent, data: {state:  'not-found'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
