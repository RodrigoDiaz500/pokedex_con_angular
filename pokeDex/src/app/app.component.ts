import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokeDex';
  pokemons: any[] = []; // Agrega la propiedad pokemons aquí
}
