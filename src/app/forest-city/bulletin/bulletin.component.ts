import { Component } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';

import bulletin from '@data/bulletin.json';



@Component({
    selector: 'bulletin',
    templateUrl: './bulletin.component.html',
    styleUrls: ['./bulletin.component.scss']
})
export class BulletinComponent {
    static get parameters() {
        return [DomSanitizer];
    }

    constructor(sanitizer: DomSanitizer) {
        this.sanitizer = sanitizer;
    }

    safeBulletinUrl() {
        if (this.sanitizer)
            return this.sanitizer.bypassSecurityTrustUrl(this.bulletinSrc);
        return "";
    }

    bulletinSrc: string = "../../../assets/pdf/FCL-March2020Bulletin.pdf";
    sanitizer: DomSanitizer;
}
