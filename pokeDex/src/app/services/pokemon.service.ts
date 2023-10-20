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
    console.log('Solicitud para obtener datos de letras'); // Agrega esta línea
    return this.http.get<LetterCountElement[]>(`${this.baseUrl}/pokemon`);
  }

}


