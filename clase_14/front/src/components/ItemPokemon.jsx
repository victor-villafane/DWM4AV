const ItemPokemon = ({ pokemon }) => {
    return (
    <tr>
        <td>{pokemon._id}</td>
        <td>{pokemon.name}</td>
        <td>
            <button className="btn btn-info" >ver</button>
        </td>
    </tr>)
}

export default ItemPokemon