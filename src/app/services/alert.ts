import { Injectable } from '@angular/core';

export interface AlertOptions {
  className: string,
  heading: string,
  text: string,
  timeout: number | void,
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert: AlertOptions | void = undefined;

  setAlert(alert: AlertOptions): void {
    this.alert = alert;
    if (alert.timeout) {
      setTimeout(() => {
        this.alert = undefined;
      }, alert.timeout);
    }
  }

  clearAlert() {
    this.alert = undefined;
  }
}
