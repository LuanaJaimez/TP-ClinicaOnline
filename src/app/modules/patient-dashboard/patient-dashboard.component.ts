import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css'],
  animations: [
    trigger('patient', [transition('* => patient', [style({ opacity: 0 }), animate(2000)])])
  ]
})
export class PatientDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getState(outlet: any)  {
		return outlet.activatedRouteData.state;
	}

}
