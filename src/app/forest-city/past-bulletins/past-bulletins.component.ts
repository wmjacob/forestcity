import { Component, OnInit } from "@angular/core";
import { PastBulletin } from "@data/interfaces";
import pastBulletins from '@data/past-bulletins.json';

@Component({
    selector: 'past-bulletins',
    templateUrl: './past-bulletins.component.html',
    styleUrls: ['./past-bulletins.component.scss']
})
export class PastBulletinsComponent implements OnInit {
    readonly BULLETIN_PATH = "https://storage.googleapis.com/forest-city-bulletins/";
    pastBulletins: PastBulletin[] = [];
    pageOfItems: Array<any> = [];

    constructor() {}

    ngOnInit() {
        this.pastBulletins = pastBulletins;
    }

    getPdf(filename: string) {
        window.open(this.BULLETIN_PATH + filename);
    }

    onChangePage(pageOfItems: Array<any>) {
        this.pageOfItems = pageOfItems;
        window.scroll(0,0);
    }
}
