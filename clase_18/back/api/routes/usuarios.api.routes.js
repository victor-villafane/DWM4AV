import express from "express"
import * as controllers from "../controllers/usuarios.api.controllers.js"
import { validateRegister } from "../../middlewares/usuarios.validate.js"

const router = express.Router()

router.post("/",[validateRegister] ,controllers.registerUser)
router.post("/login" ,controllers.loginUser)

export default router