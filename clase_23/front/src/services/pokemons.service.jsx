import { useApi } from "./api.service";

export function usePokemonsService(){
    const { call } = useApi()

    const getPokemons = () => call("/pokemons")
    const getPokemonsById = (id) => call("/pokemons/"+id)

    return { getPokemons, getPokemonsById }
}