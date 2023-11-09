import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../services/spinner.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard {

  constructor(private readonly firestore: FirestoreService,
              public afAuth: AngularFireAuth,
              private readonly router: Router,
              private spinnerService: SpinnerService,
              private toastr: ToastrService) {
    this.spinnerService.show();   
  }

  canActivate(): any {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        var userStorage = JSON.parse(localStorage.getItem('userData') || '{}');
        this.firestore.getUserRole(userStorage.uid).then
        (role => {
          console.log(role);
          if( role == 'Patient') {
            this.router.navigate(['/patient']);
            this.spinnerService.hide();   
            return true;
          }

          if( role == 'Admin') {
            this.router.navigate(['/admin']);
            this.spinnerService.hide();
            setTimeout(()=>{
              this.toastr.error("Acceso denegado. No tiene permisos para acceder a esta página.");  
            }, 5000);
            return false;
          }
          
          if( role == 'Doctor') {
            this.router.navigate(['/doctor']);
            this.spinnerService.hide();
            setTimeout(()=>{
              this.toastr.error("Acceso denegado. No tiene permisos para acceder a esta página.");  
            }, 5000);
            return false;     
          }
          this.spinnerService.hide();
          return false;
        });
        return true;  
        } else {
        this.router.navigate(['/login']);
        this.spinnerService.hide();
        return false; 
      }
    }); 
  }  
}
