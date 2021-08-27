import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'our-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
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