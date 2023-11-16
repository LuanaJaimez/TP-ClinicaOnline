import { Component, OnInit } from '@angular/core';
import { reload } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-admin-welcome',
  templateUrl: './admin-welcome.component.html',
  styleUrls: ['./admin-welcome.component.css']
})
export class AdminWelcomeComponent implements OnInit {

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
}
