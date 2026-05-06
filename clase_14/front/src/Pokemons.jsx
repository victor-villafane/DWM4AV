import { useEffect, useState } from "react"
import TablePokemon from "./components/TablePokemon"

const Pokemons = () => {
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {

        fetch("http://localhost:2026/api/pokemons")
            .then(res => res.json())
            .then(pokemons => setPokemons(pokemons))
            .catch(err => console.error(err))

    }, [])

    return (
        <TablePokemon pokemons={pokemons}>
        </TablePokemon>
    )
}

export default Pokemons