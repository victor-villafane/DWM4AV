import { readFile, writeFile } from "fs/promises"
import { MongoClient, ObjectId } from "mongodb"
import { getProductosById } from "./productos.services.js"

const client = new MongoClient("mongodb+srv://admin:admin@dwm4av.3ndyw29.mongodb.net/")
const db = client.db("dwm4av")

export async function getPokemons(filter = {}) {
    await client.connect()
    console.log(filter)
    const filterMongo = {}

    try {
        await client.connect()
        return db.collection("pokemons").find(filterMongo).toArray()
    } catch (error) {

    }
}

export async function addFavoriteCafe(idPokemon, idCafe) {
    try {
        await client.connect()
        const cafe = await getProductosById(idCafe)
        const resultado = await db.collection("pokemons").updateOne(
            { _id: new ObjectId(idPokemon) },
            // https://www.mongodb.com/es/docs/manual/reference/operator/update/push/
            // https://www.mongodb.com/es/docs/manual/reference/operator/update/addToSet/ -> compara antes de guardar
            {
                $addToSet: {
                    cafes: {
                        ...cafe
                    }
                }
            }
        )
        return resultado.modifiedCount > 0
    } catch (error) {

    }
}

export async function removeFavoriteCafe(idPokemon, idCafe) {
    try { 
        await client.connect()
        const resultado = await db.collection("pokemons").updateOne(
            { _id: new ObjectId(idPokemon) },
            // https://www.mongodb.com/es/docs/manual/reference/operator/update/push/
            // https://www.mongodb.com/es/docs/manual/reference/operator/update/addToSet/ -> compara antes de guardar
            {
                $pull:{ //https://www.mongodb.com/es/docs/manual/reference/operator/update/pull/
                    cafes: { _id: new ObjectId(idCafe) }
                }
            }
        )
        return resultado.modifiedCount > 0
    } catch (error) {

    }
}

export async function getPokemonById(id) {
    try {
        await client.connect()
        return db.collection("pokemons").findOne({ _id: new ObjectId(id) })
    } catch (error) {

    }
}

export async function guardarPokemon(pokemon) {
    try {
        await client.connect()
        await db.collection("pokemons").insertOne(pokemon)
        return pokemon
    } catch (error) {
        throw new Error(error)
    }
}

export async function borrarPokemon(id) {
    try {
        await client.connect()
        return db.collection("pokemons").deleteOne({ _id: new ObjectId(id) })
    } catch (error) {
        throw new Error("Error")
    }
}

export async function editarPokemon(pokemon, id) {
    try {
        await client.connect()
        return db.collection("pokemons").updateOne({ _id: new ObjectId(id) }, {
            $set: pokemon
        })
    } catch (error) {
        throw new Error("Error")
    }
}