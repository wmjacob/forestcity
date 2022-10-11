import { Component, OnInit } from "@angular/core";
import { GoldenSquarePM } from "./golden-square-pm";
import goldenSquarePMList from '@data/golden-square-pm-list.json';

@Component({
    selector: 'gs-past-masters',
    templateUrl: './golden-square-pm.component.html',
    styleUrls: ['./golden-square-pm.component.scss']
})
export class GoldenSquarePMComponent implements OnInit {
    goldenSquarePMList: GoldenSquarePM[] = [];

    ngOnInit(): void {
        this.goldenSquarePMList = goldenSquarePMList.reverse();
    }

}
