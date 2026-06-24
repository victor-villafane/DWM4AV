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
            age: usuario?.age,
            rol: "user"
        }
    )

    return { ...usuario, password: undefined, passwordConfirm: undefined }
}

export async function loginUser(usuario) {
    console.log("Intentando conectar a mongo db")
    await client.connect()
    console.log("Intentando buscar el usuario")
    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (!existe) throw new Error("Usuario/Contraseña incorrectos")
    console.log("el usuario existe")
    const esValido = await bcryptjs.compare(usuario.password, existe.password)
    console.log("Encriptado!")
    const token = createToken({
        email: existe.email,
        age: existe?.age,
        rol: existe?.rol || "user"
    })

    return { ...usuario, password: undefined, passwordConfirm: undefined, token }
}

export async function getUsuarios() {
    await client.connect()
    const usuariosData = await db.collection("usuarios").find().toArray()
    return usuariosData.map(usuario => {
        return { ...usuario, password: undefined, passwordConfirm: undefined }
    })
}

export async function asignarRol(id, rol) {
    await client.connect()
    return await db.collection("usuarios").updateOne({ _id: new ObjectId(id) }, {
        $set: { rol: rol }
    })
}