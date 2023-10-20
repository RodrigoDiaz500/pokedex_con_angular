import { createReducer, on } from '@ngrx/store';
import { loadPokemons, loadPokemonsSuccess, loadPokemonsFailure } from './pokemon.actions';

export interface PokemonState {
  pokemons: any[];
  error: any;
}

export const initialState: PokemonState = {
  pokemons: [],
  error: null,
};

export const pokemonReducer = createReducer(
  initialState,
  on(loadPokemons, (state) => ({ ...state })),
  on(loadPokemonsSuccess, (state, { data }) => ({ ...state, pokemons: data })),
  on(loadPokemonsFailure, (state, { error }) => ({ ...state, error })),
);

console.log("reduz",pokemonReducer);
