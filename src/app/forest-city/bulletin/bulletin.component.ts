import { Component } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
    selector: 'bulletin',
    templateUrl: './bulletin.component.html',
    styleUrls: ['./bulletin.component.scss']
})
export class BulletinComponent {
    readonly BULLETIN_PATH = 'https://storage.googleapis.com/forest-city-bulletins/';
    readonly PDF_EXT = '.pdf';
    bulletinSrc: SafeResourceUrl;

    /*
    *   Update As Necessary
    */
    currentBulletin: string = 'FCL-Bulletin-2022-01-02';

    static get parameters() {
        return [DomSanitizer];
    }

    constructor(sanitizer: DomSanitizer) {
        const rawBulletinSrc: string = this.BULLETIN_PATH + this.currentBulletin + this.PDF_EXT;
        this.bulletinSrc = sanitizer.bypassSecurityTrustResourceUrl(rawBulletinSrc)
    }


}
