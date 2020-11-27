import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackByService {

  // track by function for collections without unique identifier
  trackByIndex(index: number, item: any) {
    return index;
  }
}