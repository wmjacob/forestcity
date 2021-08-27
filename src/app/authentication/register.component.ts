import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm } from "@angular/forms";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit {
    registerForm?: FormGroup;

    constructor() {

    }

    ngOnInit() {
        this.registerForm = this.defineForm();
    }

    private defineForm(): FormGroup {
        return new FormGroup( {
            firstName: new FormControl(),
            lastName: new FormControl(),
            email: new FormControl(),
            password: new FormControl()
        } );
    }
}