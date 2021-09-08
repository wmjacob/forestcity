import { Component } from "@angular/core";
import events from '@data/events.json';

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ]
})
export class HomeComponent {
    fclAge: number = 0;
    event: any;

    ngOnInit() {
        this.calculateFCLAge();
        const event = events.find(ev => ev.spotlight && new Date(ev.date) < new Date())
        if (event) {
            this.event = { ...event, spotlightImage: `../../../assets/images/${event.spotlightImage}` };
        }
    }

    private calculateFCLAge() {
        let chartered = new Date(1867, 10, 16);
        let diff = Math.abs(Date.now() - chartered.getTime());
        this.fclAge = Math.floor((diff / (1000 * 3600 * 24)) / 365.25);
    }
}
