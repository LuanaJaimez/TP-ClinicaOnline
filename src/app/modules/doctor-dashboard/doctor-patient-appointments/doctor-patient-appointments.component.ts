import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-doctor-patient-appointments.component',
  templateUrl: './doctor-patient-appointments.component.html',
  styleUrls: ['./doctor-patient-appointments.component.css']
})
export class DoctorPatientAppointmentsComponent implements OnInit {

  approved: boolean | undefined;

  constructor(private readonly firestore: FirestoreService,
              public afAuth: AngularFireAuth,
              private spinnerService: SpinnerService,
              private toastr: ToastrService) { 
                
  }

  ngOnInit(): void {
    this.approved = false;
    this.checkApproved();
  }

  checkApproved() {
    this.spinnerService.show();
    var user = JSON.parse(localStorage.getItem('userData') || '{}');
    this.firestore.getUserApproved(user.uid)
    .then(approved => {
      console.log(approved);
      this.approved = approved;
      this.spinnerService.hide();
    });
  }
}
