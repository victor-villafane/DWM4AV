import { useApi } from "./api.service";

export function usePokemonsService(){
    const { call } = useApi()

    const getPokemons = () => call("/pokemons")
    const getPokemonsById = (id) => call("/pokemons/"+id)
    const cretePokemon = (pokemon) => call("/pokemons", "POST", pokemon)
    const editPokemon = (id, pokemon) => call("/pokemons/"+id, "PUT", pokemon)
    const deletePokemon = (id) => call("/pokemons/"+id, "DELETE")

    return { getPokemons, getPokemonsById, cretePokemon, editPokemon, deletePokemon }
}