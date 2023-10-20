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
  @Input() letterCounts: LetterCountElement[] = [];
  displayedColumns: string[] = ['letter', 'count'];
  dataSource = new MatTableDataSource<LetterCountElement>();

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    console.log('Datos de letterCounts en LetterCountComponent:', this.letterCounts);

    // Actualiza la fuente de datos de la tabla con los datos pasados.
    this.dataSource.data = this.letterCounts;

    console.log('Table data:', this.dataSource.data); // Agregar esta línea para depurar
  }

  getPokemonCountsByLetter() {
    this.pokemonService.getLetterCounts().subscribe((data) => {
      this.letterCounts = data;
      this.dataSource.data = this.letterCounts;
    });
  }
}

