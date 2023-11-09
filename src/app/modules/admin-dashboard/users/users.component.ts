import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersData: any[] = [];

  constructor(private firestoreService: FirestoreService,
              private spinnerService: SpinnerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.spinnerService.show();
    this.firestoreService.getAllUsers().subscribe((users: any) => {
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
