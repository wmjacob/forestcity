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
      subject: `Forest City ${value.firstName} ${value.lastName} RSVP for ${this.event.name}`,
      fields: ['date', 'firstName', 'lastName', 'email'],
    });
    if (response) {
      this.alertService.setAlert({
        className: 'success',
        text: 'Success! Your reservation has been sent',
        timeout: 3000,
      });
    } else {
      this.alertService.setAlert({
        className: 'error',
        text: 'Error, please try again later',
        timeout: 3000,
      });
    }
  }

}
