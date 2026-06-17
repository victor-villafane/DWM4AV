import express from "express"
import * as pokemonController from "../controllers/pokemons.api.controllers.js"
import { validatePokemon } from "../../middlewares/pokemons.validate.js"
import { validateAdmin, validateToken } from "../../middlewares/token.validate.js"

const router = express.Router()

router.get("/pokemons", [validateToken], pokemonController.getPokemons)
router.post("/pokemons/:id",[validatePokemon], pokemonController.addFavoriteCafe)
router.delete("/pokemons/:id/cafes/:idCafe", pokemonController.removeFavoriteCafe)
router.get("/pokemons/:id", [validateToken], pokemonController.getPokemonById)
router.post("/pokemons",[validateAdmin], pokemonController.savePokemon)
router.put("/pokemons/:id",[validateAdmin], pokemonController.reemplazarPokemon)
// router.patch("/productos/:id", productosController.actualizarProducto)
router.delete("/pokemons/:id",[validateAdmin], pokemonController.borrarPokemon)

export default router