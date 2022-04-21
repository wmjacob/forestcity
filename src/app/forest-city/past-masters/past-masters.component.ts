import { Component, OnInit } from '@angular/core';
import { PastMaster } from './model/get-past-masters-response';
import pastMastersList from '@data/past-master-list.json';
import events from '@data/future-events.json';

@Component({
  selector: 'fcl-past-masters',
  templateUrl: './past-masters.component.html',
  styleUrls: ['./past-masters.component.scss']
})
export class PastMastersComponent implements OnInit {
  pastMastersList: PastMaster[] = [];
  pageOfItems: Array<any> = [];
  installationOfOfficers: Array<any> = [];

  constructor() {}

  ngOnInit(): void {
    this.setPastMastersList();
  }

  setPastMastersList() {
    let today = new Date();
    let currentYear = today.getFullYear().toString();
    let currentMonth = today.getMonth(); // Jan = 0, Feb = 1 ...
    let currentDate = today.getDate();
    let installationDate: Date = new Date();

    this.installationOfOfficers = events.filter(event => {
      return event.name === 'Installation of Officers';
    });

    if(this.installationOfOfficers.length > 0) {
      installationDate = new Date(this.installationOfOfficers[this.installationOfOfficers.length - 1].date);
    }

    // TODO logic for handling if there is no installation of officers event in the json...shouldn't happen though

    this.pastMastersList = pastMastersList.filter( master => {
      // get installation date from events.json
      let termEndYear = master.term.slice(-4);
      return (currentYear > termEndYear) ||
        (currentYear === termEndYear && currentMonth > installationDate.getMonth()) ||
        (currentYear === termEndYear && currentMonth === installationDate.getMonth() && currentDate >= installationDate.getDate());
    }).reverse();
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
    window.scroll(0,0);
  }
}
