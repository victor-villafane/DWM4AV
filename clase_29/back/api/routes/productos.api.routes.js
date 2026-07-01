import express from "express"
import * as productosController from "../controllers/productos.api.controllers.js"
import { validateProducto } from "../../middlewares/producto.validate.js"

const router = express.Router()

router.get("/productos", productosController.getProductos)
router.get("/productos/:id", productosController.getProductosById)
router.post("/productos", [validateProducto], productosController.saveProducto)
router.put("/productos/:id", productosController.reemplazarProducto)
router.patch("/productos/:id", productosController.actualizarProducto)
router.delete("/productos/:id", productosController.borrarProducto)

export default router