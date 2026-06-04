import { productosSchema } from "../schemas/productos.js"


export async function validateProducto(req, res, next){
    console.log("Validate...")
    try {
        await productosSchema.validate(req.body,{ abortEarly: false, stripUnknown: true })   
        next()     
    } catch (error) {
        res.status(400).json({ message: error.errors })
    }
}