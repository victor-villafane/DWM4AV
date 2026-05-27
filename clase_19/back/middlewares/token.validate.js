import jwt from "jsonwebtoken"

export function validateToken(req, res, next){
    try {
        const auth = req.headers.authorization

        console.log(auth.split(" ")[1])
        // const bearer = auth.split(" ")[0]
        // const token = auth.split(" ")[1]
        const[ bearer, token ] = auth.split(" ")

        if( bearer != "Bearer" || !token ) return res.status(401).json({ message: "Token invalido" })

        const payload = jwt.verify(token, "1234")

        req.user = payload

        next()
    } catch (error) {
        res.status(401).json({ message: "Token invalido" })
    }
}