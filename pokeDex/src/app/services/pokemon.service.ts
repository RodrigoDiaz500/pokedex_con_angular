import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LetterCountElement } from '../components/letter-count/letter-count.component';
import { Observable, of } from 'rxjs';
import { catchError, map, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPokemons(index: number) {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`);
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
          console.log(pokemon);
        });

        const letterCounts: LetterCountElement[] = Object.keys(letterCountsMap).map((letter) => ({
          letter,
          count: letterCountsMap[letter],
        }));

        // Ordenar los resultados en orden alfabético
        letterCounts.sort((a, b) => a.letter.localeCompare(b.letter));

        return letterCounts;
      }),
      catchError((error) => {
        console.error('Error al obtener datos de letras:', error);
        return of([]);
      })
    );
  }
}


