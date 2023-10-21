import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, concatMap } from 'rxjs/operators';
import { FavoritesService } from '../favorites.service';
import { LetterCountElement } from '../components/letter-count/letter-count.component';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private favoritesService: FavoritesService) {}

  getPokemons(index: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`);
  }

  getSpecies(index: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon-species/${index}`);
  }

  getDescription(pokemonIndex: number, languageCode: string): Observable<string> {
    return this.getSpecies(pokemonIndex).pipe(
      map((species: any) => {
        const descriptionEntry = species.flavor_text_entries.find(
          (entry: any) => entry.language.name === languageCode
        );
        return descriptionEntry ? descriptionEntry.flavor_text : 'No description available';
      }),
      catchError((error) => {
        console.error('Error fetching Pokémon description:', error);
        return 'No description available';
      })
    );
  }

  getAllPokemons(): Observable<any[]> {
    return this.getAllPokemonsRecursive(`${this.baseUrl}/pokemon`, []);
  }

  private getAllPokemonsRecursive(url: string, allPokemons: any[]): Observable<any[]> {
    return this.http.get<any>(url).pipe(
      concatMap((response) => {
        allPokemons.push(...response.results);

        if (response.next) {
          return this.getAllPokemonsRecursive(response.next, allPokemons);
        } else {
          return of(allPokemons);
        }
      })
    );
  }

  getLetterCounts(): Observable<LetterCountElement[]> {
    console.log('Solicitud para obtener datos de letras');
    return this.getAllPokemons().pipe(
      map((pokemons: any[]) => {
        const letterCountsMap: { [letter: string]: number } = {};

        pokemons.forEach((pokemon: any) => {
          const firstLetter = pokemon.name.charAt(0).toUpperCase();
          letterCountsMap[firstLetter] = (letterCountsMap[firstLetter] || 0) + 1;
        });

        const letterCounts: LetterCountElement[] = Object.keys(letterCountsMap).map((letter) => ({
          letter,
          count: letterCountsMap[letter],
        }));

        letterCounts.sort((a, b) => a.letter.localeCompare(b.letter));

        return letterCounts;
      }),
      catchError((error) => {
        console.error('Error al obtener datos de letras:', error);
        return of([]);
      })
    );
  }

  // Agrega un Pokémon a la lista de favoritos
  addToFavorites(pokemon: any) {
    this.favoritesService.toggleFavorite(pokemon);
  }

  // Verifica si un Pokémon es un favorito
  isFavorite(pokemon: any): boolean {
    return this.favoritesService.isFavorite(pokemon);
  }
}
