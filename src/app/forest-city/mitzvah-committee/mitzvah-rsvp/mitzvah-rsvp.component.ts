import { formatDate } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { AlertService } from "@services/alert";
import { EmailService } from "@services/email";
import { SheetsService } from "@services/sheets";

@Component({
    selector: 'mitzvah-rsvp',
    templateUrl: './mitzvah-rsvp.component.html',
    styleUrls: ['./mitzvah-rsvp.component.scss']
})
export class MitzvahRsvpComponent implements OnInit {
    @Input() event: any;

    isSending: boolean = false;

    constructor(private emailService: EmailService,
        private sheetsService: SheetsService,
        private alertService: AlertService) { }

    ngOnInit() {
    }

    mitzvahRsvpForm: UntypedFormGroup = new UntypedFormGroup({
        firstName: new UntypedFormControl('', [Validators.required, Validators.pattern("[-\\w\\s]*")]),
        lastName: new UntypedFormControl('', [Validators.required, Validators.pattern("[-\\w\\s]*")]),
        email: new UntypedFormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        numberOfAttendees: new UntypedFormControl('1')
    });

    async submitRsvp() {
        let emailSuccessful: boolean = false;
        this.isSending = true;
        const request = this.buildRequest();
        const response = await this.emailService.sendEmail(request, '/mj/api/mitzvah-rsvp');

        if(response) {
            emailSuccessful = true;
            this.clearForm();
            this.alertService.setAlert({
                className: 'success',
                heading: 'Success!',
                text: 'Your reservation has been sent. Please check your email shortly for a confirmation message.',
                timeout: 5000,
              });
        }
        else {
            emailSuccessful = false;
            this.alertService.setAlert({
                className: 'error',
                heading: 'Error',
                text: 'We apologize, something went wrong. Please try again later.',
                timeout: 5000,
            });
        }

        if(emailSuccessful) {
            request.date = this.formatSheetsDate();
            await this.sheetsService.writeToMitzvahSheet(request);
        }

        this.isSending = false;

    }

    buildRequest() {
        const formValues = this.mitzvahRsvpForm.value;

        return {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            date: this.formatEventDate(),
            subject: `RSVP for ${this.event.name} on ${this.formatEventDate()}`,
            event: this.event,
            numberOfAttendees: formValues.numberOfAttendees
        }
    }

    disableSubmit() {
        if(this.mitzvahRsvpForm.invalid || this.isSending) {
            return true;
        }
        return false;
    }

    clearForm() {
        this.mitzvahRsvpForm.reset();
        this.isSending = false;
        this.mitzvahRsvpForm.get('numberOfAttendees')?.setValue(1);
    }

    formatEventDate() {
        return formatDate(this.cleanDate(this.event.date || ''), 'E, MMM d, y h:mma', 'en-US');
    }

    formatSheetsDate() {
        return formatDate(this.cleanDate(this.event.date || ''), 'E, MMM d, y', 'en-US');
      }

    cleanDate(date: string) {
        return date.replace(/-/g, "/");
    }

}
