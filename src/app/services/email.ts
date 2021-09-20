import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private httpClient: HttpClient) { }

  async sendEmail(data: object): Promise<boolean> {
    return new Promise((resolve) => {
      const response = this.httpClient.post('/api/email', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      response.subscribe(
        () => {
          resolve(true);
        },
        () => {
          resolve(false);
        }
      );
    });
  }
}
