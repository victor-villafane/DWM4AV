import { useEffect, useState } from "react"
import TablePokemon from "../components/TablePokemon"
import { useNavigate } from "react-router"
const Pokemons = () => {
    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {

        fetch("http://localhost:2026/api/pokemons", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                if (res.status >= 400) navigate("/logout")
                return res.json()
            })
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