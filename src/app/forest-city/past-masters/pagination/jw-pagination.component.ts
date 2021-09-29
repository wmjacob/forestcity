/**
 * This and all jw- prefixed files were brought in from https://github.com/cornflourblue/jw-angular-pagination
 */

import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import paginate from './jw-paginate/jw-paginate';

@Component({
    selector: 'jw-pagination',
    templateUrl: './jw-pagination.component.html',
    styleUrls: ['./jw-pagination.component.scss']
})

export class JwPaginationComponent implements OnInit, OnChanges {
    @Input() items: Array<any> = [];
    @Output() changePage = new EventEmitter<any>(true);
    @Input() initialPage = 1;
    @Input() pageSize = 12;
    @Input() maxPages = 10;

    pager: any = {};

    ngOnInit() {
        // set page if items array isn't empty
        if (this.items && this.items.length) {
            this.setPage(this.initialPage);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        // reset page if items array has changed
        if (changes.items.currentValue !== changes.items.previousValue) {
            this.setPage(this.initialPage);
        }
    }

    setPage(page: number) {
        // get new pager object for specified page
        this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);

        // get new page of items from items array
        var pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);

        // call change page function in parent component
        this.changePage.emit(pageOfItems);
    }
}
