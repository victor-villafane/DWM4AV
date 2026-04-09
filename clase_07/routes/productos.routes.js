import express from "express"
import * as productosController from "../controllers/productos.controllers.js"

const router = express.Router()

router.get("/productos", productosController.getProductos)
router.get("/productos/nuevo", productosController.productoForm)
router.post("/productos/nuevo", productosController.guardarProducto)

router.get("/productos/:idProductos", productosController.getProductosById)

export default router