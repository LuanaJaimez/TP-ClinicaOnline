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

}
