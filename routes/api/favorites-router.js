const express = require("express")

const favoritesControllers = require("../../controllers/favorites-controllers")

const router = express.Router()

const { authenticate, isValidFavoriteId, isValidProductId } = require("../../middlewares")

// const { schemas } = require("../../models/favorite")

router.use(authenticate)

router.post("/:productId", isValidProductId, favoritesControllers.addFavorite)

router.get("/", favoritesControllers.listFavorites)

router.delete("/:favoriteId", isValidFavoriteId, favoritesControllers.removeFavorite)

module.exports = router