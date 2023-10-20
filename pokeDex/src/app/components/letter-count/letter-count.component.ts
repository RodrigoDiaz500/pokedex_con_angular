import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { MatTableDataSource } from '@angular/material/table';

export interface LetterCountElement {
  letter: string;
  count: number;
}

@Component({
  selector: 'app-letter-count',
  templateUrl: 'letter-count.component.html',
})
export class LetterCountComponent implements OnInit {
  @Input() letterCounts: LetterCountElement[] = []; // Inicializa la propiedad con un valor predeterminado.
  displayedColumns: string[] = ['letter', 'count'];
  dataSource = new MatTableDataSource<LetterCountElement>();

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.dataSource.data = this.letterCounts; // Actualiza la fuente de datos de la tabla con los datos pasados.
  }

  getPokemonCountsByLetter() {
    this.pokemonService.getLetterCounts().subscribe((data) => {
      this.letterCounts = data;
      this.dataSource.data = this.letterCounts;
    });
  }
}
