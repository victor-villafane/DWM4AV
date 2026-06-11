import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useApi } from "../../services/api.service";
import { usePokemonsService } from "../../services/pokemons.service";

const Detail = () => {
    const [pokemon, setPokemon] = useState({})
    const [loading, setLoading] = useState(true)

    const { idPokemon } = useParams();
    const { getPokemonsById } = usePokemonsService()

    const getPokemon = async () => {
        try {
            getPokemonsById(idPokemon)
                .then(async pokemon => {
                    // const pokeRes = await fetch(pokemon.url)
                    // const pokeData = await pokeRes.json()
                    setPokemon(pokemon)
                })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPokemon()
    }, [])

    if (loading) return (
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>)

    return Object.keys(pokemon).length > 0 ? (
        <div className="container mt-4">
            <div className="card p-3 text-center">
                <h2 className="text-capitalize">
                    {pokemon.name}
                </h2>

                <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto" style={{ width: "300px" }} />

                <p className="mt-3" >
                    <strong>ID: </strong> {pokemon.id}
                </p>
                <p className="mt-3" >
                    <strong>Altura: </strong> {pokemon.height}
                </p>
                <p className="mt-3" >
                    <strong>Peso: </strong> {pokemon.weight}
                </p>
            </div>
            <Link to="/">Volver</Link>
        </div>
    ) : <div>Pokemon no encontrado</div>
}

export default Detail