import express from "express"
import * as pokemonController from "../controllers/pokemons.api.controllers.js"
import { validatePokemon } from "../../middlewares/pokemons.validate.js"
import { validateAdmin, validateToken } from "../../middlewares/token.validate.js"
import { resizeImage, upload } from "../../middlewares/imagenes.upload.js"

const router = express.Router()

router.get("/pokemons", [validateToken], pokemonController.getPokemons)
router.post("/pokemons/:id",[validatePokemon], pokemonController.addFavoriteCafe)
router.delete("/pokemons/:id/cafes/:idCafe", pokemonController.removeFavoriteCafe)
router.get("/pokemons/:id", [validateToken], pokemonController.getPokemonById)
router.post("/pokemons",[upload.single("file"), resizeImage], pokemonController.savePokemon)
router.put("/pokemons/:id",[upload.single("file")], pokemonController.reemplazarPokemon)
// router.patch("/productos/:id", productosController.actualizarProducto)
router.delete("/pokemons/:id",[validateToken, validateAdmin], pokemonController.borrarPokemon)

export default router