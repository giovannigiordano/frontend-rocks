import { Pokedex } from "pokeapi-js-wrapper";
// https://github.com/PokeAPI/pokeapi-js-wrapper

export const PokeAPI =  new Pokedex({
  limit: 20,
});
