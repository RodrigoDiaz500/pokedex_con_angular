import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private favoritesUpdatedSubject = new Subject<any[]>();

  emitFavoritesUpdated(favorites: any[]) {
    this.favoritesUpdatedSubject.next(favorites);
  }

  getFavoritesUpdatedObservable(): Observable<any[]> {
    return this.favoritesUpdatedSubject.asObservable();
  }
}
