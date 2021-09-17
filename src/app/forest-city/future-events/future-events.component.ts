import { Component, OnInit } from '@angular/core';
import events from '@data/events.json';
import { EventOptions } from '@data/interfaces';


const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
const timeFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short', hour: 'numeric', minute: 'numeric' });

@Component({
  selector: 'app-future-events',
  templateUrl: './future-events.component.html',
  styleUrls: ['./future-events.component.scss']
})
export class FutureEventsComponent {
  rsvpDate: string = '';
  rsvpName: string = '';

  ngOnInit(): void {
    this.events = events;
  }

  events: EventOptions[] = [];

  getDate(date: string) {
    return dateFormatter.format(new Date(date))
  }

  getTime(date: string) {
    return timeFormatter.format(new Date(date))
  }

  hasEventPassed(date: string): boolean {
    let today = new Date();
    let eventDate = new Date(date);

    return today > eventDate ? true : false;
  }

  setDateForRsvp(selectedDate: string, selectedName: string) {
    this.rsvpDate = selectedDate;
    this.rsvpName = selectedName;
  }
}
