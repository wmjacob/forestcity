import { Component, OnInit } from '@angular/core';
import { PastMaster } from './model/get-past-masters-response';
import pastMastersList from '@data/past-master-list.json';

@Component({
  selector: 'fcl-past-masters',
  templateUrl: './past-masters.component.html',
  styleUrls: ['./past-masters.component.scss']
})
export class PastMastersComponent implements OnInit {
  pastMastersList: PastMaster[] = [];
  pageOfItems: Array<any> = [];

  constructor() {}

  ngOnInit(): void {
    this.setPastMastersList();
  }

  setPastMastersList() {
    let today = new Date();
    let currentYear = today.getFullYear().toString();
    let currentMonth = today.getMonth(); // Jan = 0, Feb = 1 ...

    this.pastMastersList = pastMastersList.filter( master => {
      // auto-update on December 1st, as installation is different every year
      let termEndYear = master.term.slice(-4);
      return (termEndYear < currentYear) ||
        (termEndYear === currentYear && currentMonth > 10);
    }).reverse();
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
    window.scroll(0,0);
  }
}
