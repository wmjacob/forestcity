import { Component, OnInit } from '@angular/core';
import events from '@data/events.json';

// TODO: move to common interfaces
interface EventOptions {
  date: string,
  name: string,
  location: string,
  address: string,
  addressLink: string,
  rsvpOptions: object | boolean,
  spotlight: boolean,
  spotlightImage: string,
}

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
const timeFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short', hour: 'numeric', minute: 'numeric' });

console.log("events")
console.log(events)
@Component({
  selector: 'app-future-events',
  templateUrl: './future-events.component.html',
  styleUrls: ['./future-events.component.scss']
})
export class FutureEventsComponent {

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
}
