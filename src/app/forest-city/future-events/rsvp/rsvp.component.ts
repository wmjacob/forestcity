import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  rsvpForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern("[-\\w\\s]*")]),
    lastName: new FormControl('', [Validators.required, Validators.pattern("[-\\w\\s]*")]),
    masonicTitle: new FormControl('', [Validators.pattern("[-,\\w\\s]*")]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    earlyBirdDinner: new FormControl(false),
    numberOfMeals: new FormControl('1'),
    mealChoice: new FormControl('Prime Rib'),
    numberOfMeat: new FormControl(''),
    numberOfFish: new FormControl(''),
    numberOfAttendees: new FormControl('1')
  });

  constructor(private emailService: EmailService,
              private sheetsService: SheetsService,
              private alertService: AlertService) { }

  ngOnInit(): void {}

  async submitRsvp(): Promise<void> {
    let emailSuccessful: boolean = false;
    this.disableButton = true;
    const request = this.buildRequest();
    console.log('request= ' + JSON.stringify(request))
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

    return {
      firstName: formValues.firstName,
      lastName: this.getLastName(),
      email: formValues.email,
      date: this.formatEventDate(),
      subject: `RSVP for ${this.event.name} on ${this.formatEventDate()}`,
      event: this.event,
      numberOfPrimeRib: this.getNumberOfPrimeRib(),
      numberOfSalmon: this.getNumberOfSalmon(),
      mealSelection: this.getMealSelection(),
      earlyBirdDinner: earlyBirdDinner,
      numberOfMeals: numberOfMeals,
      costPerMeal: this.getCostPerMeal(),
      earlyBirdTime: this.getEarlyBirdTime(),
      numberOfAttendees: formValues.numberOfAttendees,
      meatChoice: this.getMeatChoice(),
      fishChoice: this.getFishChoice()
    }
  }

  getNumberOfPrimeRib() {
    const formValues = this.rsvpForm.value;
    if(this.displayMealChoices() && formValues.numberOfMeals > 0) {
      // TODO update this with any choices
      if(formValues.numberOfMeals == 1 && (formValues.mealChoice === 'Prime Rib' || formValues.mealChoice === 'Chicken')) {
        return 1;
      }
      return formValues.numberOfMeat ? formValues.numberOfMeat : 0;
    }
    else {
      return "-";
    }
  }

  getNumberOfSalmon() {
    const formValues = this.rsvpForm.value;
    if(this.displayMealChoices() && formValues.numberOfMeals > 0) {
      if(formValues.numberOfMeals == 1 && (formValues.mealChoice === 'Salmon' || formValues.mealChoice === 'Fish')) {
        return 1;
      }
      return formValues.numberOfFish ? formValues.numberOfFish : 0;
    }
    else {
      return "-";
    }
  }

  getMeatChoice() {
    const mealChoices = this.event.earlyBirdOptions.choices;
    return mealChoices[0] != null ? mealChoices[0] : 'Meat';
  }

  getFishChoice() {
    const mealChoices = this.event.earlyBirdOptions.choices;
    return mealChoices[1] != null ? mealChoices[1] : 'Fish';
  }

  getMealSelection() {
    const formValues = this.rsvpForm.value;
    const mealChoices = this.event.earlyBirdOptions.choices;
    if(this.displayMealChoices() && formValues.numberOfMeals > 1) {
      let numberOfMeat = formValues.numberOfMeat ? formValues.numberOfMeat : "0";
      let numberOfFish = formValues.numberOfFish ? formValues.numberOfFish : "0";
      return mealChoices[0] + ": " + numberOfMeat + " " + mealChoices[1] +": " + numberOfFish;
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
      let numberOfMeals = this.rsvpForm.get('numberOfMeals')?.value;
      let numberOfMeat = this.rsvpForm.get('numberOfMeat')?.value;
      let numberOfFish = this.rsvpForm.get('numberOfFish')?.value;
      if(numberOfMeals != numberOfMeat + numberOfFish) {
        return true;
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
