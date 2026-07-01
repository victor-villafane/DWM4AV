import { Link } from "react-router"
import ItemPokemon from "./ItemPokemon"

const TablePokemon = ({ pokemons }) => {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pokemons.map(pokemon => <ItemPokemon pokemon={pokemon} key={pokemon._id} />)
                    }
                </tbody>
            </table>
        </>)
}

export default TablePokemon