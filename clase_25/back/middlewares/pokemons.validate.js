import { pokemonsSchema } from "../schemas/pokemons.js"

export async function validatePokemon(req, res, next) {
    try {
        await pokemonsSchema.validate(req.body, { abortEarly: false, stripUnknown })
        next()
    } catch (error) {
        res.status(400).json({ message: error.errors})
    }
}