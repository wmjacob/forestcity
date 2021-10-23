import { Component, HostListener } from "@angular/core";
import { trigger, transition, animate, style } from '@angular/animations'

import { AlertService } from '@services/alert';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: [ './layout.component.scss' ],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate(250, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ],
})
export class LayoutComponent {

  constructor(private alertService: AlertService) {}

  get alert() {
    return this.alertService.alert;
  }

  dismiss() {
    this.alertService.clearAlert();
  }

@HostListener('window:scroll', []) onScroll() {
    const offset = 99;
    let mainContent = document.getElementById('main-content') as HTMLElement;
    if(window.pageYOffset >= offset) {
      mainContent.classList.add("scroll-padding");
    }
    else {
      mainContent.classList.remove("scroll-padding");
    }
  }
}
