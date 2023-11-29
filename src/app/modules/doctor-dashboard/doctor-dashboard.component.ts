import { animate, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { moveFromBottom, moveFromBottomFade } from 'ngx-router-animations';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css'],
  animations: [
    trigger('doctor', [transition('* => doctor', useAnimation(moveFromBottomFade), {delay: 200})]),
    trigger('patients', [transition('* => patients', useAnimation(moveFromBottomFade), {delay: 200})]),
    trigger('doctor-patient-appointments', [transition('* => doctor-patient-appointments', useAnimation(moveFromBottomFade), {delay: 200})])
  ]
})
export class DoctorDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getState(outlet: any)  {
		return outlet.activatedRouteData.state;
	}

}
