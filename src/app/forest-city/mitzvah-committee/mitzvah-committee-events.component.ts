import { Component, OnInit } from "@angular/core";
import { MitzvahEvent } from "@data/interfaces";
import { SheetsService } from "@services/sheets";
import events from '@data/mitzvah-events.json';
import { formatDate } from "@angular/common";
import { DomSanitizer } from "@angular/platform-browser";

const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long'});
const dateFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'});
const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' });

@Component({
    selector: 'mitzvah-committee-events',
    templateUrl: './mitzvah-committee-events.component.html',
    styleUrls: [ './mitzvah-committee-events.component.scss']
})
export class MitzvahCommitteeEventsComponent implements OnInit {
    event: any = ''; // for rsvp
    events: MitzvahEvent[] = []; // for display
    rsvpExpDate: string = '';
    paramRsvpDesc: string = '';

    constructor(private sheetsService: SheetsService,
                private domSanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.events = events;
    }

    getDate(date: string) {
        return dateFormatter.format(new Date(date.replace(/-/g, "/")))
      }

    hasEventPassed(date: string): boolean {
        let today = new Date();
        let eventDate = new Date(date.replace(/-/g, "/"));

        return today > eventDate ? true : false;
    }

    setEventForRsvp(event: MitzvahEvent) {
        this.event = event;
    }

    isRsvpBtn(event: MitzvahEvent) {
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

    isRsvpDesc(event: MitzvahEvent) {
        return event.isRsvpDesc;
    }

    hasEventImageUrl(event: MitzvahEvent) {
        if(event.eventImageUrl) {
            return true;
        }
        return false;
    }

    getMapHtml(mapHtml: string) {
        let st = this.domSanitizer.bypassSecurityTrustHtml(mapHtml);
        console.log('html string= ' + st);
        return st;
    }

}
