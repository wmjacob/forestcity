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

  disableButton: boolean = false;

  rsvpForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern("[-\\w\\s]*")]),
    lastName: new FormControl('', [Validators.required, Validators.pattern("[-\\w\\s]*")]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });

  constructor(private emailService: EmailService, private alertService: AlertService) { }

  ngOnInit(): void {}

  async submitRsvp(): Promise<void> {
    this.disableButton = true;
    const value = this.rsvpForm.value;
    const response = await this.emailService.sendEmail({
      ...value,
      date: this.event.date,
      subject: `RSVP for ${this.event.name} on ${this.event.date}`,
      fields: ['date', 'firstName', 'lastName', 'email'],
      event: this.event
    }, '/mj/api/rsvp');

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

    this.disableButton = false;
  }

}
