import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { EmailService } from '@services/email';
import { AlertService } from '@services/alert';

@Component({
  selector: 'fcl-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  @Input() event: any;

  rsvpForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern("[-\\w\\s]*")]),
    lastName: new FormControl('', [Validators.required, Validators.pattern("[-\\w\\s]*")]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });

  constructor(private emailService: EmailService, private alertService: AlertService) { }

  ngOnInit(): void {}

  async submitRsvp(): Promise<void> {
    const value = this.rsvpForm.value;
    const response = await this.emailService.sendEmail({
      ...value,
      date: this.event.date,
      subject: `RSVP for ${this.event.name} on ${this.event.date}`,
      fields: ['date', 'firstName', 'lastName', 'email'],
      event: this.event
    }, '/mailjet-api/rsvp-to-fcl');
    if (response) {
      this.alertService.setAlert({
        className: 'success',
        text: 'Success! Your reservation has been sent. Please check your email shortly for a confirmation message.',
        timeout: 3000,
      });
    } else {
      this.alertService.setAlert({
        className: 'error',
        text: 'Error, please try again later',
        timeout: 3000,
      });
    }

    // const response2 = await this.emailService.sendEmail({
    //   ...value,
    //   date: this.event.date,
    //   subject: `You have RSVP'd for ${this.event.name} on ${this.event.date} at Forest City Lodge`,
    //   fields: ['date', 'firstName', 'lastName', 'email'],
    //   event: this.event
    // }, '/api/rsvp-email-to-user');
    // if (response2) {
    //   // do nothing; previous message should state that a confirmation email is sent to user
    // } else {
    //   // maybe log, but nothing for now
    // }
  }

}
