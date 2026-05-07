import { useEffect, useState } from "react"
import TablePokemon from "../components/TablePokemon"

const Pokemons = () => {
    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        fetch("http://localhost:2026/api/pokemons")
            .then(res => res.json())
            .then(pokemons => {
                setPokemons(pokemons)
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) return (
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>)

    return (
        <TablePokemon pokemons={pokemons}>
        </TablePokemon>
    )
}

export default Pokemons