import { ClientEncryption, Collection, MongoClient, ObjectId } from "mongodb"
import jwt from "jsonwebtoken"
import { createToken } from "./token.services.js"
const client = new MongoClient("mongodb+srv://admin:admin@dwm4av.3ndyw29.mongodb.net/")
const db = client.db("dwm4av")

export async function registerUser(usuario) {
    await client.connect()
    await db.collection("usuarios").insertOne(
        {
            email: usuario.email,
            password: usuario.password,
            age: usuario?.age
        }
    )
    // console.log("usuario")
    return { ...usuario, password: undefined, passwordConfirm: undefined }
}

export async function loginUser(usuario){
    await client.connect()
    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if( !existe ) throw new Error("Usuario/Contraseña incorrectos")
    if( existe.password != usuario.password ) throw new Error("Usuario/Contraseña incorrectos")
    
    const token = createToken(existe)

    return { ...usuario, password: undefined, passwordConfirm: undefined, token }
}