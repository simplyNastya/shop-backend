const express = require("express")

const authControllers = require("../../controllers/auth-controllers")

const router = express.Router()

const { validateBody } = require("../../utils")

const {authenticate} = require("../../middlewares")

const { schemas } = require("../../models/user")

router.post("/register", validateBody(schemas.userRegisterSchema), authControllers.register)

router.post("/login", validateBody(schemas.userLoginSchema), authControllers.login)

router.post("/logout", authenticate, authControllers.logout)

router.get("/current", authenticate, authControllers.getCurrent)

module.exports = router