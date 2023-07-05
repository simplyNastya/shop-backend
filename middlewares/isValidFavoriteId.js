const { isValidObjectId } = require('mongoose')

const {HttpError} = require('../helpers')

const isValidFavoriteId = (req, res, next) => {
    const { favoriteId } = req.params
    if (!isValidObjectId(favoriteId)) {
        return next(HttpError(404, `Not found. ${favoriteId} is not valid id format`))
    }
    
    next()
}

module.exports = isValidFavoriteId