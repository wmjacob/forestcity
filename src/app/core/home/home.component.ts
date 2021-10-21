import { Component } from "@angular/core";
import events from '@data/events.json';
import { EventOptions } from "@data/interfaces";

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ]
})
export class HomeComponent {
    fclAge: number = 0;
    events: any[] = [];
    event: any = ''; // for rsvp component

    ngOnInit() {
        this.calculateFCLAge();
        const now = new Date();
        this.events = events
            .filter(ev => ev.spotlight && new Date(ev.date) > now)
            .map(event => ({ ...event, spotlightImage: `../../../assets/images/${event.spotlightImage}` }))
            .slice(0, 3);
    }

    private calculateFCLAge() {
        let chartered = new Date(1867, 10, 16);
        let diff = Math.abs(Date.now() - chartered.getTime());
        this.fclAge = Math.floor((diff / (1000 * 3600 * 24)) / 365.25);
        let today = new Date();
        if(today.getMonth() >= 9 && today.getDate() >= 16) {
            this.fclAge += 1;
        }
    }

    setEventForRsvp(event: EventOptions) {
        this.event = event;
      }
}
