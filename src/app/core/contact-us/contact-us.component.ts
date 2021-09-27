import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AlertService } from '@services/alert';
import { EmailService } from '@services/email';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactUsForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern("[-\\w\\s]*")]),
    lastName: new FormControl('', [Validators.required, Validators.pattern("[-\\w\\s]*")]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    phoneNumber: new FormControl('', [Validators.pattern("^[0-9\\s\\-\\(\\)\\+\\/]+(?:[\\.][0-9\\s\\-]+){0,2}(?:(?:ext|x)\\s?[0-9]+)?$")]),
    message: new FormControl('', [Validators.required])
  });

  constructor(private emailService: EmailService, private alertService: AlertService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  async onSubmit(): Promise<void> {
    window.scrollTo(0, 0);

    const response = await this.emailService.sendEmailToFCL({
      ...this.contactUsForm.value,
      subject: 'A New Message From Contact Us',
      fields: ['firstName', 'lastName', 'email', 'phoneNumber', 'message'],
    }, '/api/contact-us-email-to-fcl');
    this.contactUsForm.reset();
    if (response) {
      this.alertService.setAlert({
        className: 'success',
        text: 'Success! Your inquiry has been sent',
        timeout: 3000,
      });
    } else {
      this.alertService.setAlert({
        className: 'error',
        text: 'Error, please try again later',
        timeout: 3000,
      });
    }

    // TODO: create a template for contact us, and send confirmation email to user
  }

}
