const { isValidObjectId } = require('mongoose')

const {HttpError} = require('../helpers')

const isValidProductId = (req, res, next) => {
    const { productId } = req.params
    if (!isValidObjectId(productId)) {
        return next(HttpError(404, `Not found. ${productId} is not valid id format`))
    }
    
    next()
}

module.exports = isValidProductId