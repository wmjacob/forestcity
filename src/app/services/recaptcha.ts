import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RecaptchaService {
    RECAPTCHA_URL = 'https://www.google.com/recaptcha/api/siteverify';

    constructor(private httpClient: HttpClient) {}

    async doRecaptcha(data: object): Promise<object> {
        return new Promise((resolve) => {
            const response = this.httpClient.post(this.RECAPTCHA_URL, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            response.subscribe(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    resolve(error);
                }
            );
        });
    }
}

