import { animate, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { moveFromBottomFade } from 'ngx-router-animations';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css'],
  animations: [
    trigger('patient', [transition('* => patient', useAnimation(moveFromBottomFade), {delay: 200})]),
    trigger('request-appointment-patient', [transition('* => request-appointment-patient', useAnimation(moveFromBottomFade), {delay: 200})]),
    trigger('patient-own-appointment', [transition('* => patient-own-appointment', useAnimation(moveFromBottomFade), {delay: 200})])
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
