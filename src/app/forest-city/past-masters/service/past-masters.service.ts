import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GetPastMastersResponse, PastMaster } from '../model/get-past-masters-response';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PastMastersService {

  constructor(private httpClient: HttpClient) { }

  getPastMasters(): Observable<GetPastMastersResponse> {
    const getResponse = this.httpClient.get('assets/data/past-master-list.json');
    const tempResponseObj: GetPastMastersResponse = new GetPastMastersResponse();
    getResponse.subscribe(
      (successData: any) => {
        successData.forEach((element: PastMaster) => {
          let pm: PastMaster = {
            number: element.number,
            name: element.name,
            term: element.term,
            imgUrl: element.imgUrl
          }
          tempResponseObj.pastMastersList.push(pm);
        });
      },
      (errorData: HttpErrorResponse) => {
        return null;
      }
    );
    return of(tempResponseObj);
  }
}
