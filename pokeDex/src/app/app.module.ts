import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PokeTableComponent } from './components/poke-table/poke-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { LetterCountComponent } from './components/letter-count/letter-count.component';
import { StoreModule } from '@ngrx/store';
import { pokemonReducer } from 'src/store/pokemon.reducer';
import { FavoritesService } from './favorites.service';
import { EventService } from 'src/app/services/event.service'; // Agrega esta línea

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PokeTableComponent,
    LetterCountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot({ pokemon: pokemonReducer }),
    HttpClientModule
  ],
  providers: [FavoritesService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
