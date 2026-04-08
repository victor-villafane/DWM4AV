import express from "express"
import { readFile } from "fs/promises"
import { createProductDetail, createProductList } from "../pages/utils.js"

const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/productos", async (req, res) => {
    // readFile("./data/productos.json", "utf-8")
    //     .then( productos => console.log(productos) )
    //     .catch( err => console.log(err) )
    try {
        const productosString = await readFile("./data/productos.json", "utf-8")
        const productos = JSON.parse(productosString)
        res.send(createProductList(productos), "Listado de productos")
    } catch (error) {
        console.log(error)
        res.send("404")
    }
})

app.get("/productos/:idProductos", async (req, res) => {
    const idProducto = req.params.idProductos
    try {
        const productosString = await readFile("./data/productos.json", "utf-8")
        const productos = JSON.parse(productosString)
        // for( let i = 0; i < productos.length ;i++ ){
        //     if( productos[i].id == idProducto ){
        //         console.log(productos[i])
        //     }
        // }
        const producto = productos.find( producto => producto.id == idProducto )
        // console.log(producto)
        res.send(createProductDetail(producto))
    } catch (error) {
        console.log(error)
        res.send("404")
    }
})

app.get("/personajes", async (req, res) => {
    try {
        const personajes = await fetch("https://hp-api.onrender.com/api/characters")
        const body = await personajes.json()
        res.send(body)
    } catch (error) {
        res.send("No pude encontrar los personajes :(")
    }
})

app.listen(2026, () => console.log("Funcionando en http://localhost:2026"))