import { Component, OnInit } from '@angular/core';
import { reload } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  usersData: any[] = [];

  constructor(private firestoreService: FirestoreService,
              private spinnerService: SpinnerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.spinnerService.show();
    this.firestoreService.getAllSpecialists()
    .then((users: any) => {
      console.log(users)
      this.usersData = users;
      this.spinnerService.hide();
    });
  }

  disableUser(uid: any) {
    this.spinnerService.show();
    this.firestoreService.disableUser(uid).then(() => {
      this.getUsersData();
      this.spinnerService.hide();
      this.toastr.success('Usuario deshabilitado correctamente');
    });
  }  

  enableUser(uid: any) {
    this.spinnerService.show();
    this.firestoreService.enableUser(uid).then(() => {
      this.getUsersData();
      this.spinnerService.hide();
      this.toastr.success('Usuario habilitado correctamente');
    });
  }
}
