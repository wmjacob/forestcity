import { Component, OnInit } from '@angular/core';
import { PastMaster } from './model/get-past-masters-response';
import pastMastersList from '@data/uh-past-master-list.json';

@Component({
  selector: 'uh-past-masters',
  templateUrl: './past-masters.component.html',
  styleUrls: ['./past-masters.component.scss']
})
export class UniversityHeightsPMComponent implements OnInit {
  pastMastersList: PastMaster[] = [];
  pageOfItems: Array<any> = [];
  installationOfOfficers: Array<any> = [];
  listView: boolean = false;
  lodge: string = ""

  constructor() {}

  ngOnInit(): void {
    this.setPastMastersList();
    this.lodge = "University Heights Lodge no. 738"
  }

  setPastMastersList() {
    let today = new Date();
    let currentYear = today.getFullYear().toString();
    let currentMonth = today.getMonth(); // Jan = 0, Feb = 1 ...
    let currentDate = today.getDate();
    let installationDate: Date = new Date();

    // TODO logic for handling if there is no installation of officers event in the json...shouldn't happen though

    const uhPastMasters = pastMastersList.filter(master => {
      // get installation date from events.json
      let termEndYear = master.term.slice(-4);
      if (master.term === "By Affiliation") {
        return false;
      } else {
        return (currentYear > termEndYear) ||
          (currentYear === termEndYear && currentMonth > installationDate.getMonth()) ||
          (currentYear === termEndYear && currentMonth === installationDate.getMonth() && currentDate >= installationDate.getDate());
      }
    })
    const byAffiliation = pastMastersList.filter(master => {
      return master.term === "By Affiliation"
    })
    uhPastMasters.reverse()
    byAffiliation.reverse()
    this.pastMastersList = [...uhPastMasters, ...byAffiliation]
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
    window.scroll(0,0);
  }

  toggleListView() {
    this.listView = !this.listView;
  }
}
