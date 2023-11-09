import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
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
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData') || '{}');
  }
}
