import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  animations: [
    trigger('admin', [transition('* => admin', [style({ opacity: 0 }), animate(2000)])]),
    trigger('register-admin', [transition('* => register-admin', [style({ opacity: 0 }), animate(2000)])]),
    trigger('users', [transition('* => users', [style({ opacity: 0 }), animate(2000)])])
  ]
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getState(outlet: any)  {
		return outlet.activatedRouteData.state;
	}

}
