import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Patient } from 'src/app/models/patient';
import { FirestoreService } from 'src/app/services/firestore.service';
import { StorageService } from 'src/app/services/storage.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css'],
})
export class RegisterPatientComponent implements OnInit {
  form: FormGroup;
  isSpecialist: boolean = false;
  user = new User();
  patient = new Patient();
  rePassword: string = '';
  captcha: boolean = false;
  file: File | null = null;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private spinnerService: SpinnerService,
              public auth: AuthService,
              public firestore: FirestoreService,
              public storage: StorageService,
              private modal: ModalService) {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      rePassword: new FormControl(),
      name: new FormControl(),
      lastName: new FormControl(),
      age: new FormControl(),
      dni: new FormControl(),
      insurance: new FormControl(),
      specialties: new FormControl(),
      approved: new FormControl(),
    });
  }

  getValue(value: string): AbstractControl {
    return this.form.get(value) as FormGroup;
  }

  registerPatient() {
    this.user = this.form.value;
    this.user.approved = true;
    this.user.role = 'Patient';

    if (this.user.password === this.rePassword) {

      this.modal.modalCaptcha().then(res => {
        if (res) {
          this.auth.register(this.user, this.file).then((res) => {
          }).catch(e => {
            this.toastr.error(e.message);
          }).finally(() => {
            this.spinnerService.hide();
          });
        }
        this.spinnerService.hide();
      })
    } else {
      this.spinnerService.hide();
      this.modal.modalMessage('Las contraseñas no coinciden', "error");
    }
   
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.pattern('^[^@]+@[^@]+.[a-zA-Z]{2,}$')],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      rePassword: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      name: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      lastName: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      age: ['', [Validators.max(120), Validators.min(18)]],
      dni: ['', [Validators.minLength(8), Validators.maxLength(8)]],
      insurance: [''],
      specialties: [''],
      approved: true,  
    });
  }   
  
  captchaResult(result: any) {      
    this.captcha = result;
  }

  uploadImage($event: any) {
    this.file = $event.target.files;
    console.log(this.file);
  }
}