const express = require("express")

const categoriesControllers = require("../../controllers/categories-controllers")

const router = express.Router()

const {authenticate} = require("../../middlewares")

const { schemas } = require("../../models/category")

router.post("/", authenticate, categoriesControllers.addCategory)

router.get("/", categoriesControllers.listCategories)

module.exports = router