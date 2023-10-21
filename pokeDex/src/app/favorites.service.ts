import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: any[] = [];
  private favoritesSubject = new BehaviorSubject<any[]>([]);

  constructor() {}

  toggleFavorite(pokemon: any) {
    const index = this.favorites.findIndex((p) => p.name === pokemon.name);

    if (index !== -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(pokemon);
    }

    this.favoritesSubject.next(this.favorites); // Emite la lista actualizada
  }

  getFavorites(): Observable<any[]> {
    return this.favoritesSubject.asObservable(); // Devuelve un observable para la lista de favoritos
  }

  isFavorite(pokemon: any): boolean {
    return this.favorites.some((p) => p.name === pokemon.name);
  }
}

