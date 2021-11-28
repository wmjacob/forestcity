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
    events: EventOptions[] = [];
    event: any = ''; // for rsvp component

    ngOnInit() {
        this.calculateFCLAge();
        const now = new Date();
        this.events = events
            .filter(ev => ev.spotlight && new Date(ev.date.replace(/-/g, "/")) > now)
            .map(event => ({ ...event, spotlightImage: `../../../assets/images/${event.spotlightImage}` }))
            .slice(0, 3);
    }

    private calculateFCLAge() {
        let chartered = new Date(1867, 9, 16);
        let diff = Math.abs(Date.now() - chartered.getTime());
        this.fclAge = Math.floor((diff / (1000 * 3600 * 24)) / 365.25);
    }

    cleanDate(date: string) {
        return date.replace(/-/g, "/");
    }

    setEventForRsvp(event: EventOptions) {
        this.event = event;
    }

    isRsvp(event: EventOptions) {
        let expirationDaysBefore = parseInt(event.rsvpExpirationDays);
        let eventDate = new Date(event.date);
        let expirationDate = new Date(eventDate.getTime() - (expirationDaysBefore * 24 * 60 * 60 * 1000));
        expirationDate.setHours(21, 0);

        let today = new Date();
        if(today.getFullYear() >= expirationDate.getFullYear() &&
            today.getMonth() >= expirationDate.getMonth() &&
            today.getDate() >= expirationDate.getDate() &&
            today.getTime() >= expirationDate.getTime()) {
              return false;
          }
        return event.rsvpOptions;
      }
}
