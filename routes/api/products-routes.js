const express = require('express')

const productsController = require('../../controllers/products-controllers')

const { validateBody } = require('../../utils')

const { schemas } = require('../../models/product')

const { authenticate, isValidProductId } = require('../../middlewares')

const router = express.Router()

router.get('/', productsController.listProducts)

router.get('/:productId', isValidProductId, productsController.getProductById)

router.post('/', authenticate, validateBody(schemas.addProductSchema), productsController.addProduct)

router.put('/:productId', authenticate, isValidProductId, validateBody(schemas.putProductSchema), productsController.updateProductById)

router.delete('/:productId', authenticate, isValidProductId, productsController.removeProduct)

module.exports = router;