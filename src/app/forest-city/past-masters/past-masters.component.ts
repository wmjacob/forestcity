import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GetPastMastersResponse, PastMaster } from './model/get-past-masters-response';
import { PastMastersService } from './service/past-masters.service';

@Component({
  selector: 'fcl-past-masters',
  templateUrl: './past-masters.component.html',
  styleUrls: ['./past-masters.component.scss']
})
export class PastMastersComponent implements OnInit {
  getPastMastersResponse: GetPastMastersResponse;
  pastMastersList: PastMaster[] = [];

  constructor(private pastMastersService: PastMastersService) {
    this.getPastMastersResponse = this.pastMastersService.getPastMasters();
  }

  ngOnInit(): void {
    console.log("in past masters component, list= " + this.getPastMastersResponse.pastMastersList.toString());
    this.pastMastersList = this.getPastMastersResponse.pastMastersList;
  }
}