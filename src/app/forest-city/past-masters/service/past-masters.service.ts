import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GetPastMastersResponse, PastMaster } from '../model/get-past-masters-response';

@Injectable({
  providedIn: 'root'
})
export class PastMastersService {

  constructor(private httpClient: HttpClient) { }

  getPastMasters(): GetPastMastersResponse {
    const response = this.httpClient.get('assets/data/past-master-list.json');
    let responseObj: GetPastMastersResponse = new GetPastMastersResponse();
    response.subscribe(
      (successData: any) => {
        successData.forEach((element: PastMaster) => {
          let pm: PastMaster = {
            number: element.number,
            name: element.name,
            term: element.term,
            imgUrl: element.imgUrl
          }
          responseObj.pastMastersList.push(pm);
        });
        return responseObj;
      },
      (errorData: HttpErrorResponse) => {}
    );
    return responseObj;
  }
}
