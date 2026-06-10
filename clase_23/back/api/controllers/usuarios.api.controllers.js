import * as services from "../../services/usuarios.services.js"

export async function registerUser(req, res) {
    try {
        const usuario = await services.registerUser(req.body)
        res.status(201).json(usuario)
    } catch (error) {
        res.status(500).json({ message: "No se pudo crear un usuario" })
    }
}

export async function loginUser(req, res) {
    try {
        const usuario = await services.loginUser(req.body)
        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({ message: "No se pudo logear el usuario" })
    }
}