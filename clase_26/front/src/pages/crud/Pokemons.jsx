import { useEffect, useState } from "react"
import TablePokemon from "../../components/TablePokemon"
import { usePokemonsService } from "../../services/pokemons.service"
import { Link } from "react-router"
import { useRol } from "../../contexts/SessionContext"

const Pokemons = () => {
    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(true)
    const rol = useRol()
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
        <>
            {
                rol == "admin" && <Link className="btn btn-primary my-4" to="/nuevo-pokemon" >Agregar pokemon</Link>
            }
            <TablePokemon pokemons={pokemons}>
            </TablePokemon>
        </>

    ) : <div>No se encontraron pokemons</div>
}

export default Pokemons