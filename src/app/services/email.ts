import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private httpClient: HttpClient) { }

  async sendEmail(data: object, url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const response = this.httpClient.post(url, JSON.stringify(data), {
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
