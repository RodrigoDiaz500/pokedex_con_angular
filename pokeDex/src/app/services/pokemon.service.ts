import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LetterCountElement } from '../components/letter-count/letter-count.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPokemons(index: number) {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`);
  }

  getLetterCounts(): Observable<LetterCountElement[]> {
    // Realiza una llamada HTTP para obtener los datos de letras y recuentos desde tu API.
    return this.http.get<LetterCountElement[]>(`${this.baseUrl}/letter-counts`);
  }

}


