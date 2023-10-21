import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LetterCountComponent, LetterCountElement } from '../letter-count/letter-count.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'image', 'type'];
  dataSource = new MatTableDataSource<any>();
  pokemons: any[] = [];
  selectedPokemon: any | undefined;
  letterCounts: LetterCountElement[] = [];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(LetterCountComponent, { static: true }) letterCountComponent: LetterCountComponent | undefined;

  constructor(private PokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemons();

    this.PokemonService.getPokemons(1).subscribe({
      next: (res) => {
        this.selectedPokemon = {
          position: 1,
          name: res.name,
          image: res.sprites.front_default,
          type: res.types,
          height: res.height,
          weight: res.weight,
        };
      },
      error: (err) => {
        console.error('Error al obtener el primer Pokémon:', err);
      }
    });
  }

  ngAfterViewInit() {
    if (this.letterCountComponent) {
      this.letterCountComponent.letterCounts = this.pokemons;
    }
  }

  getPokemons() {
    let pokemonData;

    for (let i = 1; i <= 150; i++) {
      this.PokemonService.getPokemons(i).subscribe({
        next: (res) => {
          pokemonData = {
            position: i,
            name: res.name,
            image: res.sprites.front_default,
            type: res.types,
            height: res.height,
            weight: res.weight,
          };
          this.pokemons.push(pokemonData);
        },
        error: (err) => {
          console.error('Error al obtener los Pokémon:', err);
        },
        complete: () => {
          this.pokemons.sort((a, b) => a.position - b.position);
          this.dataSource = new MatTableDataSource<any>(this.pokemons);
          this.dataSource.paginator = this.paginator ?? null;
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row: any) {
    this.selectedPokemon = row;
  }
}
