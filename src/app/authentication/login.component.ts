import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm } from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
    loginForm?: FormGroup;

    constructor() {

    }

    ngOnInit() {
        this.loginForm = this.defineForm();
    }

    private defineForm(): FormGroup {
        return new FormGroup( {
            email: new FormControl(),
            password: new FormControl()
        } );
    }
}
