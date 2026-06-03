import jwt from "jsonwebtoken"

export function createToken(usuario) {
    const token = jwt.sign(
        { ...usuario, password: undefined, passwordConfirm: undefined }
        , process.env.SECRET,
        { expiresIn: "2h" }
    )

    return token
}

export function validarToken(token) {
    const payload = jwt.verify(token, process.env.SECRET)
    return payload
}