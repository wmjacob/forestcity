import { Component } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
        const rawBulletingSrc: string = bulletin.filename;
        this.bulletinSrc = sanitizer.bypassSecurityTrustResourceUrl(rawBulletingSrc)
    }

    bulletinSrc: SafeResourceUrl;
}
