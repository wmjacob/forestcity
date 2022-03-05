import { Component } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import bulletin from '@data/bulletin.json';
@Component({
    selector: 'bulletin',
    templateUrl: './bulletin.component.html',
    styleUrls: ['./bulletin.component.scss']
})
export class BulletinComponent {
    readonly BULLETIN_PATH = 'https://storage.googleapis.com/forest-city-bulletins/';
    bulletinSrc: SafeResourceUrl;

    static get parameters() {
        return [DomSanitizer];
    }

    constructor(sanitizer: DomSanitizer) {
        const rawBulletinSrc: string = this.BULLETIN_PATH + bulletin.filename;
        this.bulletinSrc = sanitizer.bypassSecurityTrustResourceUrl(rawBulletinSrc)
    }


}
