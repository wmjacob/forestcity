import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SheetsService {
    private readonly SHEETS_URL = '/sheets/api/append-rsvp';

    constructor(private httpClient: HttpClient) {}

    async writeToSheet(data: object): Promise<boolean> {
        return new Promise((resolve) => {
            const response = this.httpClient.post(this.SHEETS_URL, JSON.stringify(data), {
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
}
