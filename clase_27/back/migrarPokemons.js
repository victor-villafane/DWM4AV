import { getPokemons, editarPokemon } from "./services/pokemons.services.js";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const migracion = async () => {
    const pokemons = await getPokemons()
    for (let pokemon of pokemons) {
        if (pokemon?.url) {
            console.log(pokemon?.url)
            const res = await fetch(pokemon?.url)
            console.log(res)
            const pokemonData = await res.json()
            console.log(pokemonData)
            await editarPokemon({...pokemonData, url: undefined}, pokemon._id)
            // return
        }
    }
}

migracion()