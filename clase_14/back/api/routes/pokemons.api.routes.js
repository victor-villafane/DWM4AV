import express from "express"
import * as pokemonController from "../controllers/pokemons.api.controllers.js"

const router = express.Router()

router.get("/pokemons", pokemonController.getPokemons)
router.post("/pokemons/:id", pokemonController.addFavoriteCafe)
router.delete("/pokemons/:id/cafes/:idCafe", pokemonController.removeFavoriteCafe)
// router.get("/productos/:id", productosController.getProductosById)
// router.post("/productos", productosController.saveProducto)
// router.put("/productos/:id", productosController.reemplazarProducto)
// router.patch("/productos/:id", productosController.actualizarProducto)
// router.delete("/productos/:id", productosController.borrarProducto)

export default router