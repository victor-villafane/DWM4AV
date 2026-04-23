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

// export async function getProductosById(req, res) {
//     const id = req.params.id
//     try {
//         const producto = await service.getProductosById(id)
//         res.status(200).json(producto)
//     } catch (error) {
//         res.status(500).json({ message: "Error al traer los productos" })
//     }
// }

// export async function saveProducto(req, res) {
//     try {
//         const producto = {
//             nombre: req.body.nombre,
//             precio: req.body.precio
//         }
//         const respuesta = await service.guardarProducto(producto)
//         res.status(201).json(respuesta)
//     } catch (error) {
//         res.status(500).json({ message: error })
//     }
// }

// export async function reemplazarProducto(req, res) {
//     const id = req.params.id
//     try {
//         const producto = {
//             id: id,
//             nombre: req.body.nombre,
//             precio: req.body.precio
//         }
//         const respuesta = await service.editarProducto(producto)
//         res.status(202).json(respuesta)
//     } catch (error) {
//         res.status(500).json({ message: "Error guardar el producto" })
//     }
// }

// export async function actualizarProducto(req, res){
//     const id = req.params.id
//     try {
//         const productoAntiguo = await service.getProductosById(id)
//         const producto = {}
//         producto.nombre = req.body?.nombre ? req.body.nombre : productoAntiguo?.nombre
//         producto.precio = req.body?.precio ? req.body.precio : productoAntiguo?.precio
//         producto.id = id
//         const respuesta = await service.editarProducto(producto)
//         res.status(202).json(respuesta)
//     } catch (error) {
//         res.status(500).json({ message: "Error guardar el producto" })
//     }    
// }

// export async function borrarProducto(req, res){
//     const id = req.params.id
//     try {
//         const respuesta = await service.borrarProducto(id)
//         res.status(202).json(respuesta)
//     } catch (error) {
//         res.status(500).json({ message: "Error guardar el producto" })
//     }
// }