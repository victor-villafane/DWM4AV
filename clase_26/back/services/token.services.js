import jwt from "jsonwebtoken"

export function createToken(usuario) {
    const token = jwt.sign(
        { ...usuario, password: undefined, passwordConfirm: undefined }
        ,"1234",
        { expiresIn: "2h" }
    )

    return token
}

export function validarToken(token) {
    const payload = jwt.verify(token,"1234")
    return payload
}