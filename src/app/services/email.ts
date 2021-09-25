import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private httpClient: HttpClient) { }

  async sendEmailToFCL(data: object): Promise<boolean> {
    return new Promise((resolve) => {
      const response = this.httpClient.post('/api/email-to-fcl', JSON.stringify(data), {
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

  async sendEmailToUser(data: object): Promise<boolean> {
    return new Promise((resolve) => {
      const response = this.httpClient.post('/api/email-to-user', JSON.stringify(data), {
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
