import { Component, ViewChild, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'image', 'type'];
  dataSource = new MatTableDataSource<any>();
  pokemons: any[] = [];
  selectedPokemon: any | undefined; // Inicializa selectedPokemon

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  constructor(private PokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemons();

    // Inicializa selectedPokemon con el primer Pokémon
    this.PokemonService.getPokemons(1).subscribe({
      next: (res) => {
        this.selectedPokemon = {
          position: 1,
          name: res.name,
          image: res.sprites.front_default,
          type: res.types,
          height: res.height,
          weight: res.weight
        };
      },
      error: (err) => {
        console.error('Error al obtener el primer pokémon:', err);
      }
    });
  }

  getPokemons() {
    let pokemonData;

    for (let i = 1; i <= 100; i++) {
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
          console.error('Error al obtener los pokémons:', err);
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
