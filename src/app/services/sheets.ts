import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SheetsService {
    private readonly SHEETS_APPEND_URL = '/sheets/api/append-rsvp';
    private readonly SHEETS_READ_URL = '/sheets/api/read';

    constructor(private httpClient: HttpClient) {}

    async writeToSheet(data: object): Promise<boolean> {
        return new Promise((resolve) => {
            const response = this.httpClient.post(this.SHEETS_APPEND_URL, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
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

    async readFromSheet() : Promise<any> {
        return new Promise((resolve) => {
            const response = this.httpClient.get(this.SHEETS_READ_URL);

            response.subscribe(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    resolve(error);
                }
            );
        });
    }
}
