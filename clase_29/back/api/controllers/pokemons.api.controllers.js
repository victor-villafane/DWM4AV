import * as service from "../../services/pokemons.services.js"

export async function getPokemons(req, res) {
    const filtros = req.query
    try {
        const productos = await service.getPokemons(filtros)
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({ message: "Error al traer los productos" })
    }
}

export async function addFavoriteCafe(req, res){
    const idPokemon = req.params.id
    const idCafe = req.body.idCafe
    try {
        const addFavorite = await service.addFavoriteCafe(idPokemon, idCafe)
        if( addFavorite ){
            res.status(202).json({message: "El cafe fue agregado correctamente"})
        }else{
            res.status(404).json({message: "No se pudo agregar el cafe"})
        }
    } catch (error) {
        
    }
}

export async function removeFavoriteCafe(req, res){
    const idPokemon = req.params.id
    const idCafe = req.params.idCafe
    try {
        const removeFavorite = await service.removeFavoriteCafe(idPokemon, idCafe)
        if( removeFavorite ){
            res.status(202).json({message: "El cafe fue eliminado correctamente"})
        }else{
            res.status(404).json({message: "No se pudo quitar el cafe"})
        }
    } catch (error) {
        
    }
} 

export async function getPokemonById(req, res) {
    const id = req.params.id
    try {
        const producto = await service.getPokemonById(id)
        res.status(200).json(producto)
    } catch (error) {
        res.status(500).json({ message: "Error al traer los productos" })
    }
}

export async function savePokemon(req, res) {
    req.body.imagen = req.file.filename
    console.log(req.body)
    try {
        const respuesta = await service.guardarPokemon(req.body)
        res.status(201).json(respuesta)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export async function reemplazarPokemon(req, res) {
    console.log(req.body)
    console.log(req.file)
    const id = req.params.id
    try {
        const pokemon = req.body
        pokemon.imagen = req.file.filename
        const respuesta = await service.editarPokemon(pokemon, id)
        res.status(202).json(respuesta)
    } catch (error) {
        res.status(500).json({ message: "Error actualizar el pokemon" })
    }
}

export async function borrarPokemon(req, res){
    const id = req.params.id
    try {
        const respuesta = await service.borrarPokemon(id)
        res.status(202).json(respuesta)
    } catch (error) {
        res.status(500).json({ message: "Error borrar el pokemon" })
    }
}