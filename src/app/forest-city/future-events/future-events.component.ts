import { formatDate } from '@angular/common';
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
export class FutureEventsComponent implements OnInit {
  event: any = ''; // for rsvp component
  events: EventOptions[] = [];
  rsvpExpDate: string = '';
  rsvpExpTime: string = '';

  ngOnInit(): void {
    this.events = events;
  }

  getDate(date: string) {
    return dateFormatter.format(new Date(date.replace(/-/g, "/")))
  }

  getTime(date: string) {
    return timeFormatter.format(new Date(date.replace(/-/g, "/")))
  }

  getTyled(tyled: boolean) {
    return tyled ? 'Tyled' : 'Open';
  }

  hasEventPassed(date: string): boolean {
    let today = new Date();
    let eventDate = new Date(date.replace(/-/g, "/"));

    return today > eventDate ? true : false;
  }

  setEventForRsvp(event: EventOptions) {
    this.event = event;
  }

  isRsvp(event: EventOptions) {
    let expirationDaysBefore = parseInt(event.rsvpExpirationDays);
    let eventDate = new Date(event.date);
    let expirationDate = new Date(eventDate.getTime() - (expirationDaysBefore * 24 * 60 * 60 * 1000));
    expirationDate.setHours(21, 0);
    this.rsvpExpDate = formatDate(expirationDate, 'MMM d', 'en-US');
    this.rsvpExpTime = formatDate(expirationDate, 'h:mma', 'en-US');
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
