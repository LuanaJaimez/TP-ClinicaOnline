import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css'],
  animations: [
    trigger('doctor', [transition('* => doctor', [style({ opacity: 0 }), animate(2000)])]),
    trigger('patients', [transition('* => patients', [style({ opacity: 0 }), animate(2000)])])
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
