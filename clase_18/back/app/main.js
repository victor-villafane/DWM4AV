import express from "express"
import productosRoutes from "../routes/productos.routes.js"
import productosApiRoutes from "../api/routes/productos.api.routes.js"
import pokemonsApiRoutes from "../api/routes/pokemons.api.routes.js"
import usuariosApiRoutes from "../api/routes/usuarios.api.routes.js"
import cors from "cors"

const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use( cors() )

app.use(productosRoutes)
app.use("/api", productosApiRoutes)
app.use("/api", pokemonsApiRoutes)
app.use("/api/usuarios", usuariosApiRoutes)

app.listen(2026, () => console.log("Funcionando en http://localhost:2026"))