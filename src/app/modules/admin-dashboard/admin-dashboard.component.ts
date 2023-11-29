import { animate, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { moveFromBottom, moveFromBottomFade, rotateRoomToTop, scaleDownFromBottom } from 'ngx-router-animations';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  animations: [
    trigger('admin', [transition('* => admin', useAnimation(moveFromBottomFade), {delay: 200})]),
    trigger('home-admin', [transition('* => home-admin', useAnimation(moveFromBottomFade), {delay: 200})]),
    trigger('register-admin', [transition('* => register-admin', useAnimation(moveFromBottomFade), {delay: 200})]),
    trigger('users', [transition('* => users', useAnimation(moveFromBottomFade), {delay: 200})]),
    trigger('appointments', [transition('* => appointments', useAnimation(moveFromBottomFade), {delay: 200})]),
    trigger('request-appointment-admin', [transition('* => request-appointment-admin', useAnimation(moveFromBottomFade), {delay: 200})]),
    trigger('stats', [transition('* => stats', useAnimation(moveFromBottomFade), {delay: 200})]),
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
