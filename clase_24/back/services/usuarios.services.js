import { ClientEncryption, Collection, MongoClient, ObjectId } from "mongodb"
import jwt from "jsonwebtoken"
import { createToken } from "./token.services.js"
import bcryptjs from "bcryptjs"
const client = new MongoClient("mongodb+srv://admin:admin@dwm4av.3ndyw29.mongodb.net/")
const db = client.db("dwm4av")

export async function registerUser(usuario) {
    await client.connect()

    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (existe) throw new Error("No se pudo registrar")
    usuario.password = await bcryptjs.hash(usuario.password, 11)

    await db.collection("usuarios").insertOne(
        {
            email: usuario.email,
            password: usuario.password,
            age: usuario?.age
        }
    )

    return { ...usuario, password: undefined, passwordConfirm: undefined }
}

export async function loginUser(usuario) {
    await client.connect()
    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (!existe) throw new Error("Usuario/Contraseña incorrectos")
    const esValido = await bcryptjs.compare(usuario.password, existe.password)

    const token = createToken(existe)

    return { ...usuario, password: undefined, passwordConfirm: undefined, token }
}