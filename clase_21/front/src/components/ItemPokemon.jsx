import { Link } from "react-router"

const ItemPokemon = ({ pokemon }) => {
    console.log()
    return (
    <tr>
        <td>{pokemon._id}</td>
        <td>{pokemon.name}</td>
        <td>
            <Link to={`/detail/${pokemon._id}`} className="btn btn-info" >ver</Link>
        </td>
    </tr>)
}

export default ItemPokemon