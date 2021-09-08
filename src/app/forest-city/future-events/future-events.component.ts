import { Component, OnInit } from '@angular/core';

interface EventOptions {
  date: string,
  name: string,
  location: string,
  address: string,
  addressLink: string,
  rsvpOptions: object | boolean
}

const events: EventOptions[] = [
  {
    date: '2011-10-05 14:48',
    name: 'Brotherhood Night',
    location: 'Forest City Lodge',
    address: 'Lyndhurst Masonic Temple',
    addressLink: 'https://goo.gl/maps/YLCvNWBDL1XQMRyg6',
    rsvpOptions: false,
  },
]

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
const timeFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short', hour: 'numeric', minute: 'numeric' });

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
}
