import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fcl-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {

  @Input() rsvpDate: string = "";

  rsvpForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern("[-\\w\\s]*")]),
    lastName: new FormControl('', [Validators.required, Validators.pattern("[-\\w\\s]*")]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });

  constructor() { }

  ngOnInit(): void {

  }

  submitRsvp() {
    let request = {
      'firstName': this.rsvpForm.get('firstName')?.value,
      'lastName': this.rsvpForm.get('lastName')?.value,
      'email': this.rsvpForm.get('email')?.value,
      'rsvpDate': this.rsvpDate
    };
    console.log('RSVP for obj:First Name=' + request.firstName + ', Last Name=' +request.lastName + ', Email=' + request.email + ', Date=' + request.rsvpDate);
    // TODO send email to user and webmaster, and display thank you message
  }

}
