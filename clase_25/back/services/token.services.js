import jwt from "jsonwebtoken"

export function createToken(usuario) {
    const token = jwt.sign(
        { ...usuario, password: undefined, passwordConfirm: undefined }
        , process.env.SECRET || "1234",
        { expiresIn: "2h" }
    )

    return token
}

export function validarToken(token) {
    const payload = jwt.verify(token, process.env.SECRET || "1234")
    return payload
}