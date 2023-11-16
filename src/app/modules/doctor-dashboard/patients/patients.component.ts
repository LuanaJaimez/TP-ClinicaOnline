import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  appointmentsBySpecialist: any;
  patientsBySpecialist: any = [];
  patients: any;
  user: any;
  userData: any;
  patientMedicalHistory: any;
  patientAppointments: any;

  constructor(public auth: AuthService,
              public firestore: FirestoreService,
              public storage: StorageService,
              private fb: FormBuilder,
              private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData') || '{}');
    this.getUserData();
  }

  getUserData() {
    this.firestore.getUserData(this.user.uid)
    .then((user: any) => {      
      this.userData = user;
    })
    .then(() => {
      this.getPatients();
    });
  }

  getPatients() {
    this.patientsBySpecialist = [];
    this.appointmentsBySpecialist = '';
    this.patients = '';
    this.spinnerService.show();
    this.firestore.getAllPatients()
    .then((data) => {
      this.patients = data;      
    })
    .then(() => {
      this.firestore.getAppointmentsBySpecialist(this.userData.displayName)
      .then((data) => {
        this.appointmentsBySpecialist = data;})
      .then(() => {
        this.patients.forEach((patient: any) => {
          patient.appointmentDates = [];
          this.appointmentsBySpecialist.forEach((appointment: any) => {
            if (patient.displayName == appointment.patient) {
              this.patientsBySpecialist.push(patient);
              patient.appointmentDates.push(appointment.date);
            }
          });
        });
      })
      .then(() => {
        this.patientsBySpecialist = this.removeDuplicates(this.patientsBySpecialist)
      })
      .then(() => {
        console.log(this.patients);
        console.log(this.patientsBySpecialist);  
      })
    })
    .finally(() => {
      console.log(this.patientsBySpecialist);
      this.spinnerService.hide();
    });
  }

  removeDuplicates(arr: any) {
    return arr.filter((item: any,
        index: any) => arr.indexOf(item) === index);
  }
}
