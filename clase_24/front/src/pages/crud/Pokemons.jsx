import { useEffect, useState } from "react"
import TablePokemon from "../../components/TablePokemon"
import { usePokemonsService } from "../../services/pokemons.service"

const Pokemons = () => {
    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(true)

    const { getPokemons } = usePokemonsService()
    useEffect(() => {

        getPokemons()
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

    return pokemons.length > 0 ? (
        <TablePokemon pokemons={pokemons}>
        </TablePokemon>
    ) : <div>No se encontraron pokemons</div>
}

export default Pokemons