import { Link } from "react-router"

const ItemPokemon = ({ pokemon }) => {
    return (
    <tr>
        <td>{pokemon._id}</td>
        <td>{pokemon.name}</td>
        <td  >
            <Link to={`/detail/${pokemon._id}`} className="btn btn-info mx-2" >Ver</Link>
            <Link to={`/editar-pokemon/${pokemon._id}`} className="btn btn-warning mx-2" >Editar</Link>
            <Link to={`/borrar-pokemon/${pokemon._id}`} className="btn btn-danger mx-2" >Borrar</Link>
        </td>
    </tr>)
}

export default ItemPokemon