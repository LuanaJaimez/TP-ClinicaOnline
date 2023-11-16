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

  userStatus(uid: any, status:boolean){
    this.spinnerService.show();
    this.firestoreService.userStatus(uid, status).then(() => {
      this.spinnerService.hide();
      if(status == true){
      this.toastr.success('Usuario habilitado correctamente');}
      else if(status == false){
      this.toastr.success('Usuario deshabilitado correctamente');
      }
    });
  }
}
