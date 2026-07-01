import express from "express"
import * as controllers from "../controllers/usuarios.api.controllers.js"
import { validateLogin, validateRegister } from "../../middlewares/usuarios.validate.js"
import { validateAdmin, validateToken } from "../../middlewares/token.validate.js"

const router = express.Router()

router.post("/recuperar-cuenta" ,controllers.recuperarCuenta)
router.post("/reset-password" ,controllers.resetPassword)
router.post("/",[validateRegister] ,controllers.registerUser)
router.post("/login", [validateLogin] ,controllers.loginUser)
router.get("/", [/*validateToken, validateAdmin*/] ,controllers.getUsuarios)
router.post("/:id", [/*validateToken, validateAdmin*/] ,controllers.asignarRol)

export default router