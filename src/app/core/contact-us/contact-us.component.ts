import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    message: new FormControl('', [Validators.required, Validators.pattern("[-\\w\\s@$():\',./#&]*")])
  });

  constructor() { }

  ngOnInit(): void {
  }

  // TODO on submit, email to the webmaster/secretary/WM

}
