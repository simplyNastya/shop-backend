const { Favorite } = require('../models/favorite')

const { ctrlWrapper } = require('../utils')

const { HttpError } = require('../helpers')

const listFavorites = async (req, res) => {
    const { _id } = req.user
    const filter = {user_id: _id}
    const result = await Favorite.find(filter).populate('product_id')
    res.json(result)
}

const addFavorite = async (req, res) => {
    const {_id} = req.user
    const { productId } = req.params
    const result = await Favorite.create({ product_id: productId, user_id: _id });
      if (!result) {
        throw HttpError(404, 'Not found')
      }
    res.status(201).json(result);
}

const removeFavorite = async (req, res) => {
    console.log(req)
    const { favoriteId } = req.params
    const result = await Favorite.findByIdAndDelete(favoriteId)
    if (!result) {
      throw HttpError(404, `Product with ${favoriteId} not found in favorites`)
    }
    res.status(200).json({message: "Product deleted from favorites"})
}

module.exports = {
    listFavorites: ctrlWrapper(listFavorites),
    addFavorite: ctrlWrapper(addFavorite),
    removeFavorite: ctrlWrapper(removeFavorite),
}