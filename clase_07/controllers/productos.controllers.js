import * as productosService from "../services/productos.services.js"
import * as prouctosView from "../views/productos.views.js"

export async function getProductos(req, res) {
    try {
        const productos = await productosService.getProductos()
        res.send(prouctosView.createProductList(productos), "Listado de productos")
    } catch (error) {
        res.send("404")
    }
}

export async function getProductosById(req, res){
    const idProducto = req.params.idProductos
    try {
        const producto = await productosService.getProductosById(idProducto)
        res.send(prouctosView.createProductDetail(producto))
    } catch (error) {
        console.log(error)
        res.send("404")
    }
}

export function productoForm(req, res){
    res.send( prouctosView.productoForm() )
}

export async function guardarProducto(req, res){
    try {
        const producto = await productosService.guardarProducto(req.body)
        res.send(prouctosView.createProductDetail(producto))
    } catch (error) {
        console.log(error)
        res.send("404")
    }
}