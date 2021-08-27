import { Component } from "@angular/core";

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ]
})
export class HomeComponent {
    fclAge: number = 0;

    ngOnInit() {
        this.calculateFCLAge();
    }

    private calculateFCLAge() {
        let chartered = new Date(1867, 10, 16);
        let diff = Math.abs(Date.now() - chartered.getTime());
        this.fclAge = Math.floor((diff / (1000 * 3600 * 24)) / 365.25);
    }
}