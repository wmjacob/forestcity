import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GetPastMastersResponse } from './model/get-past-masters-response';
import { PastMastersService } from './service/past-masters.service';

@Component({
  selector: 'fcl-past-masters',
  templateUrl: './past-masters.component.html',
  styleUrls: ['./past-masters.component.scss']
})
export class PastMastersComponent implements OnInit {
  pastMastersList: GetPastMastersResponse = new GetPastMastersResponse;

  constructor(private pastMastersService: PastMastersService) { }

  ngOnInit(): void {
    this.pastMastersList = this.pastMastersService.getPastMasters();
    console.log("in past masters component, list= " + this.pastMastersList);
  }
}
