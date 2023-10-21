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
  styleUrls: ['./letter-count.component.scss']
})
export class LetterCountComponent implements OnInit {
  @Input() letterCounts: LetterCountElement[] = [];
  displayedColumns: string[] = ['letter', 'count'];
  dataSource = new MatTableDataSource<LetterCountElement>();

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getLetterCounts().subscribe((data) => {
      this.letterCounts = data;
      this.dataSource.data = this.letterCounts;
    });
  }
}
