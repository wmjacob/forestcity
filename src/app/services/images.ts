import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private readonly FCL_IMAGE_BUCKET = 'https://storage.googleapis.com/storage/v1/b/forest-city-website-images/o';
    constructor(private httpClient: HttpClient) {}

    getImages(): Observable<any> {
        const response = this.httpClient.get(this.FCL_IMAGE_BUCKET, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response;
    }
}
