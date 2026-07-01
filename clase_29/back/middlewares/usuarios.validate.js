import { loginSchema, registerSchema } from "../schemas/usuarios.js";

export async function validateRegister(req, res, next){
    try {
        await registerSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        next()
    } catch (error) {
        res.status(400).json({ message: error.errors })
    }
}

export async function validateLogin(req, res, next){
    try {
        await loginSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        next()
    } catch (error) {
        res.status(400).json({ message: error.errors })
    }
}

