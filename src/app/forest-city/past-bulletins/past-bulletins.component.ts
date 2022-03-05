import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { PastBulletin } from "@data/interfaces";
import pastBulletins from '@data/past-bulletins.json';

@Component({
    selector: 'past-bulletins',
    templateUrl: './past-bulletins.component.html',
    styleUrls: ['./past-bulletins.component.scss']
})
export class PastBulletinsComponent implements OnInit {
    readonly BULLETIN_PATH = 'https://storage.googleapis.com/forest-city-bulletins/';
    pastBulletins: PastBulletin[] = [];
    pageOfItems: Array<any> = [];
    viewSource: SafeResourceUrl = '';
    modalTitle: string = '';

    static get parameters() {
        return [DomSanitizer];
    }

    constructor(private domSanitizer: DomSanitizer) {}

    ngOnInit() {
        this.pastBulletins = pastBulletins;
    }

    downloadPdf(filename: string) {
        window.open(this.BULLETIN_PATH + filename);
    }

    viewPdf(bulletin: PastBulletin) {
        const rawSource = this.BULLETIN_PATH + bulletin.filename;
        this.viewSource = this.domSanitizer.bypassSecurityTrustResourceUrl(rawSource);
        this.modalTitle = bulletin.displayName + ' ' + bulletin.year;
    }

    onChangePage(pageOfItems: Array<any>) {
        this.pageOfItems = pageOfItems;
        window.scroll(0,0);
    }
}
