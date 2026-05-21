import express from "express"
import * as pokemonController from "../controllers/pokemons.api.controllers.js"
import { validatePokemon } from "../../middlewares/pokemons.validate.js"

const router = express.Router()

router.get("/pokemons", pokemonController.getPokemons)
router.post("/pokemons/:id",[validatePokemon], pokemonController.addFavoriteCafe)
router.delete("/pokemons/:id/cafes/:idCafe", pokemonController.removeFavoriteCafe)
router.get("/pokemons/:id", pokemonController.getPokemonById)
// router.post("/productos", productosController.saveProducto)
// router.put("/productos/:id", productosController.reemplazarProducto)
// router.patch("/productos/:id", productosController.actualizarProducto)
// router.delete("/productos/:id", productosController.borrarProducto)

export default router