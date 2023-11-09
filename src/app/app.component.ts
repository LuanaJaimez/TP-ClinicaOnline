import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router, NavigationStart, Event, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('admin', [transition('* => admin', [style({ opacity: 0 }), animate(2000)])]),
    trigger('patient', [transition('* => patient', [style({ opacity: 0 }), animate(2000)])]),
    trigger('doctor', [transition('* => doctor', [style({ opacity: 0 }), animate(2000)])]),
    trigger('verification', [transition('* => verification', [style({ opacity: 0 }), animate(2000)])]),
    trigger('not-found', [transition('* => not-found', [style({ opacity: 0 }), animate(2000)])])
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
