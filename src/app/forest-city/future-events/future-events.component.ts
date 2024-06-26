import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import events from '@data/future-events.json';
import { EventOptions } from '@data/interfaces';
import { SheetsService } from '@services/sheets';


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
  attendeeCount: number = 0;

  constructor(private sheetsService: SheetsService) {
    this.readSheetForGuestLimit();
  }

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
    return tyled ? 'Tyled: Masons Only' : 'Open to All';
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
    if(today.getTime() >= expirationDate.getTime()) {
      return false;
    }

    // BE SURE TO UPDATE sheets-api.js AS WELL
    if(event.rsvpLimit) {
      if(this.attendeeCount >= 70) {
        return false;
      }
    }

    return event.rsvpOptions;
  }

  getEarlyBirdOptions(options: any) {
    let time: string = options.time;
    time = time.replace('(', '').replace(')', '').replace(/\s+/g, '');
    if(options.time) {
      return 'Dinner: ' + time + ' Cost: $' + options.cost;
    }
    return '';
  }

  // ***UPDATE sheets-api.js with the event as well!!!
  async readSheetForGuestLimit() {
    await this.sheetsService.readFromSheet().then(
      (result) => {
        this.attendeeCount = this.getNumberOfAttendees(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private getNumberOfAttendees(response: any) {
    return response.data;
  }
}
