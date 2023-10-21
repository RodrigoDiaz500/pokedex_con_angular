import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  favoritePokemon: any;
  favoritePokemonDescription: string | undefined;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    console.log('Iniciando HeaderComponent');

    // Suscríbete al evento de actualización
    this.eventService.getFavoritesUpdatedObservable().subscribe((favorites) => {
      this.updateFavorites(favorites);
      //console.log('Evento de actualización recibido en HeaderComponent:', this.favoritePokemon);

      // Agrega un log para verificar la descripción
      //console.log('Descripción del Pokémon:', this.favoritePokemonDescription);
    });

    // Actualiza la lista de favoritos al inicio
    this.updateFavorites();
  }

  private updateFavorites(favorites?: any[]) {
    if (Array.isArray(favorites) && favorites.length > 0) {
      this.favoritePokemon = favorites[favorites.length - 1];

      // Convierte la primera letra del nombre del Pokémon en mayúscula
      if (this.favoritePokemon && this.favoritePokemon.name) {
        this.favoritePokemon.name = this.capitalizeFirstLetter(this.favoritePokemon.name);
      }
    }
  }

  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
