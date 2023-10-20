import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-letter-count',
  templateUrl: './letter-count.component.html',
  styleUrls: ['./letter-count.component.scss']
})
export class LetterCountComponent implements OnChanges {
  @Input() pokemons: any[] = [];
  letterCounts: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemons'] && this.pokemons && this.pokemons.length > 0) {
      this.calculateLetterCounts();
    }
  }

  calculateLetterCounts() {
    const letterMap = new Map<string, number>();

    this.pokemons.forEach((pokemon) => {
      const firstLetter = pokemon.name.charAt(0).toUpperCase();

      if (letterMap.has(firstLetter)) {
        letterMap.set(firstLetter, letterMap.get(firstLetter)! + 1);
      } else {
        letterMap.set(firstLetter, 1);
      }
    });

    this.letterCounts = Array.from(letterMap, ([letter, count]) => ({ letter, count }));

    // Agregar un console.log para imprimir los valores
    console.log('Letter Counts:', this.letterCounts);
  }
}
