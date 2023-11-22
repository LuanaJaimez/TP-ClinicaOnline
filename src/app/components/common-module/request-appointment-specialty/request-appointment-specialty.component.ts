import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-request-appointment-specialty',
  templateUrl: './request-appointment-specialty.component.html',
  styleUrls: ['./request-appointment-specialty.component.css']
})
export class RequestAppointmentSpecialtyComponent implements OnInit {

  specialtiesList: any;
  @Input() doctor = '';
  @Output() selectedSpecialtyEvent = new EventEmitter<string>();


  constructor(private toastr: ToastrService,
              private spinnerService: SpinnerService,
              public auth: AuthService,
              public firestore: FirestoreService,
              public storage: StorageService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.doctor = changes['doctor'].currentValue;
    this.spinnerService.show();
    this.firestore.getSpecialtiesByDoctor(this.doctor).then((data) => {
      this.specialtiesList = data;
      this.spinnerService.hide();
    });    
  } 

  selectSpecialty(e: any) {
    this.selectedSpecialtyEvent.emit(e.target.value);
  }
}
