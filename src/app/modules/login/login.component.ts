import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ProfileComponent } from 'src/app/components/common-module/profile/profile.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  usuario = new User();
  /*
  userData: any;
  admin: any;
  patient1: any;
  patient2: any;
  patient3: any;
  doctor1: any;
  doctor2: any;
  */

  constructor(private auth: AuthService,
              private readonly fb: FormBuilder, 
              private spinnerService: SpinnerService,
              private toastr: ToastrService,
              private firestoreService: FirestoreService) {                
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  getValue(value: string): AbstractControl {
    return this.form.get(value) as FormGroup;
  }

  ingresar(user: User) {
    this.spinnerService.show();
    this.auth.login(user.email, user.password).then(res => { 
    })
    .catch(e => { this.toastr.error(e.message) })
    .finally(() => {
      this.spinnerService.hide(); 
    });
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  onSubmit() {
    this.spinnerService.show();
    this.ingresar(this.form.value);
  }

  fillFormAdmin() : void {
    this.form = this.fb.group({
      email: ['vezihiwecoi-admin@yopmail.com'],
      password: ['123456'],
    });
  }

  fillFormPatient1() : void {
    this.form = this.fb.group({
      email: ['vezihiwecoi-patient1@yopmail.com'],
      password: ['123456'],
    });
  }

  fillFormPatient2() : void {
    this.form = this.fb.group({
      email: ['vezihiwecoi-patient2@yopmail.com'],
      password: ['123456'],
    });
  }

  fillFormPatient3() : void {
    this.form = this.fb.group({
      email: ['vezihiwecoi-patient3@yopmail.com'],
      password: ['123456'],
    });
  }

  fillFormDoctor1() : void {
    this.form = this.fb.group({
      email: ['vezihiwecoi-doctor1@yopmail.com'],
      password: ['123456'],
    });
  }

  fillFormDoctor2() : void {
    this.form = this.fb.group({
      email: ['vezihiwecoi-doctor2@yopmail.com'],
      password: ['123456'],
    });
  }
}
