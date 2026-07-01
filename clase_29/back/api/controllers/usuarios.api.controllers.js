import * as services from "../../services/usuarios.services.js"
import * as emailService from "../../services/email.service.js"

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

export async function getUsuarios(req, res) {
    try {
        const usuarios = await services.getUsuarios()
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json({ message: "No se pudo obtener los usuarios" })
    }
}

export async function asignarRol(req, res) {
    const id = req.params?.id
    if( !id ) return res.status(404).json({ message: "No me enviaste un id valido!!" })
    const rol = req.body?.rol
    if( !rol && ["user", "admin"].includes(rol) ) return res.status(404).json({ message: "No me enviaste un rol valido!!" })

    try {
        const respuesta = await services.asignarRol(id, rol)
        res.status(202).json(respuesta)
    } catch (error) {
        res.status(500).json({ message: "No se pudo obtener los usuarios" })
    }
}

export function recuperarCuenta(req, res){
    console.log("req.body", req.body)
    const email = req.body?.email
     emailService.recuperarCuenta(email)
     res.status(200).json({message: "OK"})
}

export function resetPassword(req, res){
    const token = req.query.token
    const pass = req.body.pass
    const passConfirm = req.body.passConfirm

    services.resetPassword(token, pass, passConfirm)
        .then( () => res.status(200).json({ message: "OK" }) )
        .catch( (err) => res.status(500).json({ message: err }) )
}