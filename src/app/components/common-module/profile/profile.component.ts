import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileSpecialtiesList: any[] = [];
  userData:any;
  patientMedicalHistory: any;
  patientAppointments: any;
  patientAppointmentsBySpecialty: any;
  day: string | undefined;
  days: any[] = [];
  specialty: any;

  daysData: Array<any> = [
    { name: 'Lunes', value: 'monday' },
    { name: 'Martes', value: 'tuesday' },
    { name: 'Miercoles', value: 'wednesday' },
    { name: 'Jueves', value: 'thursday' },
    { name: 'Viernes', value: 'friday' },
    { name: 'Sabado', value: 'saturday' },
    { name: 'Domingo', value: 'sunday' }   
  ];

  constructor(public authService: AuthService,
              private firestoreService: FirestoreService,
              private toastr: ToastrService,
              private spinnerService: SpinnerService) {
    
  }

  ngOnInit(): void {
    this.spinnerService.show();
    var user = JSON.parse(localStorage.getItem('userData') || '{}');
    this.firestoreService.getUserData(user.uid)
    .then((user: any) => {
      this.userData = user;
    })
    .finally(() => {
      this.spinnerService.hide();
    });
  }

  removeDuplicates(arr: any) {
    return arr.filter((item: any,
        index: any) => arr.indexOf(item) === index);
  }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.analizeDay(event.target.value);
      console.log(this.days);
    } else {
      this.days = this.days.filter((item) => item !== event.target.value);
      console.log(this.days);
    }
  }

  analizeDay(day:any) {
    var dayArr = day.split('-');

    if(dayArr[1] == "undefined" || dayArr[2] == "undefined") {
      this.toastr.error("Debe completar los horarios de atención");
      return;
    }   

    if(dayArr[1] > dayArr[2]) {
      this.toastr.error("La hora de inicio no puede ser mayor a la hora de fin");
      return;
    }
    
    if(dayArr[1] == dayArr[2]) {
      this.toastr.error("La hora de inicio no puede ser igual a la hora de fin");
      return;
    }   

    if(dayArr[1] < "08:00") {
      this.toastr.error("La hora de inicio no puede ser por fuera del horario de atencion");
      return;
    } 

    if(dayArr[2] > "18:00") {
      this.toastr.error("La hora de fin no puede ser por fuera del horario de atencion");
      return;
    } 

    this.days.push(day);
  }

  updateServiceHours() {
    this.spinnerService.show();
    this.firestoreService.updateServiceHours(this.userData.uid, this.days)
    .then(() => {
      this.toastr.success("Horarios de atención actualizados");
      this.firestoreService.getUserData(this.userData.uid)
      .then((user: any) => {
        this.userData = user;
      })
    })
    .catch((error) => {
      this.toastr.error(error);
    })
    .finally(() => {
      this.spinnerService.hide();
    });
  }

}
