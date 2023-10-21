import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LetterCountComponent} from '../letter-count/letter-count.component';
import { EventService } from 'src/app/services/event.service';

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
  selectedPokemonDescription: string | undefined;
  favorites: any[] = []; // Arreglo para almacenar Pokémon favoritos

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(LetterCountComponent, { static: true }) letterCountComponent: LetterCountComponent | undefined;

  constructor(private PokemonService: PokemonService, private eventService: EventService) {}

  ngOnInit(): void {
    this.getPokemons();
    this.loadDefaultPokemonInfo();
  }

  ngAfterViewInit() {
    if (this.letterCountComponent) {
      this.letterCountComponent.letterCounts = this.pokemons;
    }
  }

  loadDefaultPokemonInfo() {
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

        this.PokemonService.getDescription(1, 'es').subscribe((description) => {
          this.selectedPokemonDescription = description;
        });
      },
      error: (err) => {
        console.error('Error al obtener el primer Pokémon:', err);
      }
    });
  }

  getPokemons() {
    for (let i = 1; i <= 1008; i++) {
      this.loadPokemonData(i);
    }
  }

  loadPokemonData(i: number) {
    this.PokemonService.getPokemons(i).subscribe({
      next: (res) => {
        const pokemonData = {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row: any) {
    this.selectedPokemon = row;
    this.PokemonService.getDescription(row.position, 'es').subscribe((description) => {
      this.selectedPokemonDescription = description;
    });
  }

  toggleFavorite(pokemon: any) {
    const index = this.favorites.findIndex((favorite) => favorite.position === pokemon.position);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(pokemon);
    }

    // Emite el evento de actualización con los datos de favoritos
    this.eventService.emitFavoritesUpdated(this.favorites);
  }

  isFavorite(pokemon: any): boolean {
    return this.favorites.some((favorite) => favorite.position === pokemon.position);
  }
}
