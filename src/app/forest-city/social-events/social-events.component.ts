import { Component, OnInit } from "@angular/core";
import { SocialEvent } from "@data/interfaces";
import events from '@data/social-events.json';
import { formatDate } from "@angular/common";

const dateFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'});

@Component({
  selector: 'app-social-events',
  templateUrl: './social-events.component.html',
  styleUrls: ['./social-events.component.scss']
})
export class SocialEventsComponent implements OnInit {
    event: any = ''; // for rsvp component
    events: SocialEvent[] = []; // for display
    rsvpExpDate: string = '';
    
    ngOnInit() {
        this.events = events;
    }
    
    setEventForRsvp(event: SocialEvent) {
        this.event = event;
    }

    isRsvpBtn(event: SocialEvent) {
        if(!event.isRsvpBtn) {
            return false;
        }
        
        let expirationDaysBefore = 1;
        let eventDate = new Date(event.date);
        let expirationDate = new Date(eventDate.getTime() - (expirationDaysBefore * 24 * 60 * 60 * 1000));
        expirationDate.setHours(21, 0);
        this.rsvpExpDate = formatDate(expirationDate, 'MMM d', 'en-US');
        let today = new Date();
        if(today.getTime() >= expirationDate.getTime()) {
            return false;
        }

        return true;
    }

    hasEventImageUrl(event: SocialEvent) {
        return event.eventImageUrl ? true : false;
    }

    getDate(date: string) {
        return dateFormatter.format(new Date(date.replace(/-/g, "/")))
    }

    hasEventPassed(date: string): boolean {
        let today = new Date();
        let eventDate = new Date(date.replace(/-/g, "/"));

        return today > eventDate ? true : false;
    }
}