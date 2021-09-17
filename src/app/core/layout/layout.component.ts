import { Component } from "@angular/core";
import { trigger, transition, animate, style } from '@angular/animations'

import { AlertService } from '@services/alert';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: [ './layout.component.scss' ],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate(200, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(1000, style({ opacity: 0, height: 0 }))
      ])
    ])
  ],
})
export class LayoutComponent {

  constructor(private alertService: AlertService) {}

  get alert() {
    return this.alertService.alert;
  }
}
