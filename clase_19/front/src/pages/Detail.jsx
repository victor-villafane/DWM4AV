import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

const Detail = () => {
    const [pokemon, setPokemon] = useState({})
    const [loading, setLoading] = useState(true)

    const { idPokemon } = useParams();
    const navigate = useNavigate()

    const getPokemon = async () => {
        try {
            const res = await fetch("http://localhost:2026/api/pokemons/" + idPokemon, {
                headers: {
                    "authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
            if (res.status >= 400) navigate("/logout")
            else {
                console.log(res)
                const pokemon = await res.json()

                const pokeRes = await fetch(pokemon.url)
                const pokeData = await pokeRes.json()

                setPokemon(pokeData)
            }
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

    return Object.keys(pokemon) > 0 ? (
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