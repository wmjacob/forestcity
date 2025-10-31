import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { EmailService } from '@services/email';
import { AlertService } from '@services/alert';
import { formatDate } from '@angular/common';
import { SheetsService } from '@services/sheets';
@Component({
  selector: 'fcl-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  @Input() event: any;

  disableButton: boolean = false;
  earlyBirdChecked: boolean = false;
  mealChoice: boolean = false;

  rsvpForm: UntypedFormGroup = new UntypedFormGroup({
    firstName: new UntypedFormControl('', [Validators.required, Validators.pattern("[-\\w\\s\']*")]),
    lastName: new UntypedFormControl('', [Validators.required, Validators.pattern("[-\\w\\s\']*")]),
    masonicTitle: new UntypedFormControl('', [Validators.pattern("[-,\\w\\s]*")]),
    email: new UntypedFormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    earlyBirdDinner: new UntypedFormControl(false),
    numberOfMeals: new UntypedFormControl('1'),
    mealChoice: new UntypedFormControl(''),
    numberOfAttendees: new UntypedFormControl('1')
  });

  constructor(private emailService: EmailService,
              private sheetsService: SheetsService,
              private alertService: AlertService) { }

  ngOnInit(): void {
  }

  getFormControlName(choice: string): string {
    let controlName = 'count' + choice.replace(/\s/g, "");
    this.rsvpForm.addControl(controlName, new UntypedFormControl(''));
    return controlName;
  }

  async submitRsvp(): Promise<void> {
    let emailSuccessful: boolean = false;
    this.disableButton = true;
    const request = this.buildRequest();
    const response = await this.emailService.sendEmail(request, '/mj/api/rsvp');

    if (response) {
      emailSuccessful = true;
      this.clearForm();
      this.alertService.setAlert({
        className: 'success',
        heading: 'Success!',
        text: 'Your reservation has been sent. Please check your email shortly for a confirmation message.',
        timeout: 5000,
      });

    } else {
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
      await this.sheetsService.writeToSheet(request);
    }

    this.disableButton = false;
  }

  cleanDate(date: string) {
    return date.replace(/-/g, "/");
  }

  buildRequest() {
    const formValues = this.rsvpForm.value;
    let earlyBirdDinner = this.earlyBirdChecked ? "Yes" : "No";
    let numberOfMeals = this.earlyBirdChecked ? formValues.numberOfMeals : 0;

    let request = {
      firstName: formValues.firstName,
      lastName: this.getLastName(),
      email: formValues.email,
      date: this.formatEventDate(),
      subject: `RSVP for ${this.event.name} on ${this.formatEventDate()}`,
      event: this.event,
      numberOfAttendees: formValues.numberOfAttendees,
      earlyBirdDinner: earlyBirdDinner,
      earlyBirdTime: this.getEarlyBirdTime(),
      numberOfMeals: numberOfMeals,
      costPerMeal: this.getCostPerMeal(),
      mealSelection: this.getMealSelection(),
      firstChoice: this.getChoiceForIndex(0),
      firstChoiceCount: this.getNumberOfMealChoice(0),
      secondChoice: this.getChoiceForIndex(1),
      secondChoiceCount: this.getNumberOfMealChoice(1),
    }

    if(this.event.earlyBirdOptions.choices.length > 2) {
      let jsonObj = JSON.parse(JSON.stringify(request));
      jsonObj.thirdChoice = this.getChoiceForIndex(2);
      jsonObj.thirdChoiceCount = this.getNumberOfMealChoice(2);
      if(this.event.earlyBirdOptions.choices.length > 3) {
        jsonObj.fourthChoice = this.getChoiceForIndex(3);
        jsonObj.fourthChoiceCount = this.getNumberOfMealChoice(3);
      }
      request = jsonObj;
    }

    return request;
  }

  getNumberOfMealChoice(index: number) {
    const formValues = this.rsvpForm.value;
    const mealChoices = this.event.earlyBirdOptions.choices;
    if(this.displayMealChoices() && formValues.numberOfMeals > 0) {
      if(formValues.numberOfMeals == 1 && (formValues.mealChoice === mealChoices[index])) {
        return 1;
      }
      else {
        let count = this.rsvpForm.get(this.getFormControlName(mealChoices[index]))?.value;
        return count ? count : 0;
      }
    }
    else {
      return "-";
    }
  }

  getChoiceForIndex(index: number) {
    const mealChoices = this.event.earlyBirdOptions.choices;
    return mealChoices[index] != null ? mealChoices[index] : this.getDefaultChoice(index);
  }

  getDefaultChoice(index: number) {
    return index === 0 ? 'Meat' : 'Fish';
  }

  getChoiceCountForIndex(index: number) {
    const mealChoices = this.event.earlyBirdOptions.choices;
    return this.rsvpForm.get(this.getFormControlName(mealChoices[index]))?.value ? this.rsvpForm.get(this.getFormControlName(mealChoices[index]))?.value : 0;
  }

  getMealSelection() {
    const formValues = this.rsvpForm.value;
    const mealChoices = this.event.earlyBirdOptions.choices;
    if(this.displayMealChoices() && formValues.numberOfMeals > 1) {
      let countFirstChoice = this.getChoiceCountForIndex(0);
      let countSecondChoice = this.getChoiceCountForIndex(1);
      if(mealChoices.length < 3) {
        return mealChoices[0] + ": " + countFirstChoice + " " + mealChoices[1] +": " + countSecondChoice;
      }
      else {
        let numberOfMealChoices = this.event.earlyBirdOptions.choices;
        let countThirdChoice = this.getChoiceCountForIndex(2);
        if(numberOfMealChoices.length == 4) {
          let countFourthChoice = this.getChoiceCountForIndex(3);
          return mealChoices[0] + ": " + countFirstChoice + " " + mealChoices[1] +": " + countSecondChoice + " " + mealChoices[2] + ": " + countThirdChoice + " " + mealChoices[3] + ": " + countFourthChoice;
        }
        return mealChoices[0] + ": " + countFirstChoice + " " + mealChoices[1] +": " + countSecondChoice + " " + mealChoices[2] + ": " + countThirdChoice;
      }
    }
    else if(this.displayMealChoices() && formValues.numberOfMeals == 1) {
      return formValues.mealChoice;
    }
    else {
      return "-";
    }
  }

  getLastName() {
    const formValues = this.rsvpForm.value;
    if(formValues.masonicTitle) {
      return formValues.lastName + ', ' + formValues.masonicTitle;
    }
    else {
      return formValues.lastName;
    }
  }

  getCostPerMeal() {
    let cost = this.event.earlyBirdOptions.cost;
    return cost ? '$' + cost : '-';
  }

  getEarlyBirdTime() {
    let time: string = this.event.earlyBirdOptions.time;
    return time.replace('(', '').replace(')', '').replace(/\s+/g, '');
  }

  clearForm() {
    this.rsvpForm.reset();
    this.earlyBirdChecked = false;
    this.rsvpForm.get('mealChoice')?.setValue('Prime Rib');
    this.rsvpForm.get('numberOfMeals')?.setValue(1);
    this.rsvpForm.get('numberOfAttendees')?.setValue(1);
  }

  toggleChecked() {
    this.earlyBirdChecked = !this.earlyBirdChecked;
    this.rsvpForm.get('earlyBirdDinner')?.setValue(this.earlyBirdChecked);
  }

  displayEarlyBirdCheckbox() {
    let earlyBirdOptions = this.event.earlyBirdOptions;
    if(earlyBirdOptions !== undefined) {
      return earlyBirdOptions.cost !== "";
    }
    return false;
  }

  displayMealChoices(): boolean {
    return this.earlyBirdChecked && this.event.earlyBirdOptions.choices.length > 0;
  }

  displayMultipleMealChoices(): boolean {
    return this.rsvpForm.get('numberOfMeals')?.value > 1;
  }


  disableSubmit() {
    if(this.rsvpForm.invalid || this.disableButton) {
      return true;
    }
    if(this.displayMultipleMealChoices() && this.displayMealChoices()) {
      const mealChoices = this.event.earlyBirdOptions.choices;
      let numberOfMeals = this.rsvpForm.get('numberOfMeals')?.value;
      let countFirstChoice = this.getChoiceCountForIndex(0);
      let countSecondChoice = this.getChoiceCountForIndex(1);
      if(mealChoices.length < 3) {
        if(numberOfMeals != countFirstChoice + countSecondChoice) {
          return true;
        }
      }
      else {
        let countThirdChoice = this.getChoiceCountForIndex(2);
        if(mealChoices.length > 3) {
          let countFourthChoice = this.getChoiceCountForIndex(3);
          if(numberOfMeals != countFirstChoice + countSecondChoice + countThirdChoice + countFourthChoice) {
            return true;
          }
          else {
            return false;
          }
        }
        if(numberOfMeals != countFirstChoice + countSecondChoice + countThirdChoice) {
          return true;
        }
        else {
          return false;
        }
      }
    }
    return false;
  }

  formatEventDate() {
    return formatDate(this.cleanDate(this.event.date || ''), 'E, MMM d, y h:mma', 'en-US');
  }

  formatSheetsDate() {
    return formatDate(this.cleanDate(this.event.date || ''), 'E, MMM d, y', 'en-US');
  }

}
