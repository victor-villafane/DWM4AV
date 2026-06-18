import jwt from "jsonwebtoken"
import { validarToken } from "../services/token.services.js"

export function validateToken(req, res, next) {
    try {
        const auth = req.headers.authorization

        console.log(auth.split(" ")[1])
        // const bearer = auth.split(" ")[0]
        // const token = auth.split(" ")[1]
        const [bearer, token] = auth.split(" ")

        if (bearer != "Bearer" || !token) return res.status(401).json({ message: "Token invalido" })

        const payload = validarToken(token)

        req.user = payload

        next()
    } catch (error) {
        res.status(401).json({ message: "Token invalido" })
    }
}

export function validateAdmin(req, res, next) {
    if (req.user.rol == "admin") return next()
    res.status(401).json({ message: "Token invalido" })
}