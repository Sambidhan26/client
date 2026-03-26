import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  loading = false;
  badRequestCount = 0;

  busy() {
    this.badRequestCount++;
    this.loading = true;
  }

  idle() {
    this.badRequestCount--;

    if (this.badRequestCount <= 0) {
      this.badRequestCount = 0;
      this.loading = false;
    }
  }
}
