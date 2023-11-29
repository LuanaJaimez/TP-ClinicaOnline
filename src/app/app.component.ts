import { animate, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { Router, NavigationStart, Event, NavigationEnd} from '@angular/router';
import { moveFromBottom, moveFromBottomFade, rotateCubeToTop, rotateRoomToTop } from 'ngx-router-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('admin', [transition('* => admin', useAnimation(moveFromBottomFade), {delay: 200})]),
    trigger('patient', [transition('* => patient', useAnimation(moveFromBottomFade), {delay: 200})]),
    trigger('doctor', [transition('* => doctor', useAnimation(moveFromBottomFade), {delay: 200})]),
    trigger('verification', [transition('* => verification', useAnimation(moveFromBottomFade), {delay: 200})]),
    trigger('not-found', [transition('* => not-found', useAnimation(moveFromBottomFade), {delay: 200})])
  ]
})

export class AppComponent {
  
  title = 'clinica';
  timeout: string | number | NodeJS.Timeout | undefined;
  
  loader = true;
  constructor(private router: Router) {
    router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  getState(outlet: any)  {
		return outlet.activatedRouteData.state;
	}

  navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loader = true;
    }
    if (event instanceof NavigationEnd) {
      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout);
        this.loader = false;
      }, 1000);
    }
  }
}
