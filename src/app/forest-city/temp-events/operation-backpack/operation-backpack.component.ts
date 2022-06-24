import { Component } from "@angular/core";

@Component({
    selector: 'fcl-operation-backpack',
    templateUrl: './operation-backpack.component.html',
    styleUrls: ['./operation-backpack.component.scss']
})
export class OperationBackpackComponent {

    constructor() {}

    viewListPdf() {
        window.open("https://storage.googleapis.com/temporary-events/2022_OBP_Toolkit/OBP_2022_SupplyList.pdf");
    }
}
