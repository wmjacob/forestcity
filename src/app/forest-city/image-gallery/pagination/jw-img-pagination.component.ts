/**
 * This and all jw- prefixed files were brought in from https://github.com/cornflourblue/jw-angular-pagination
 */

import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { LocalStorageService } from '@services/localStorageService';

import paginate from './jw-paginate/jw-paginate';

@Component({
    selector: 'jw-img-pagination',
    templateUrl: './jw-img-pagination.component.html',
    styleUrls: ['./jw-img-pagination.component.scss']
})

export class JwImgPaginationComponent implements OnInit, OnChanges {
    @Input() items: Array<any> = [];
    @Output() changePage = new EventEmitter<any>(true);
    @Input() initialPage = 1;
    @Input() pageSize = 6;
    @Input() maxPages = 10;

    pager: any = {};
    currentPage: number = 1;

    constructor(private localStorageService: LocalStorageService) {}

    ngOnInit() {
        this.setCurrentPage();

        // set page if items array isn't empty
        if (this.items && this.items.length) {
            this.setPage(this.currentPage);
        }
    }

    private setCurrentPage() {
        this.currentPage = Number.parseInt(this.localStorageService.getData('currentPage') || '1');
    }

    ngOnChanges(changes: SimpleChanges) {
        this.setCurrentPage();
        // reset page if items array has changed
        if (changes.items.currentValue !== changes.items.previousValue) {
            this.setPage(this.currentPage);
        }
    }

    setPage(page: number) {
        // get new pager object for specified page
        this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);

        // get new page of items from items array
        var pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);

        this.localStorageService.saveData('currentPage', page);
        this.setCurrentPage();

        // call change page function in parent component
        this.changePage.emit(pageOfItems);
    }
}
