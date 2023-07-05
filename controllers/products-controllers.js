const { Product } = require("../models/product")

const { HttpError } = require("../helpers")

const { ctrlWrapper } = require("../utils")

const listProducts = async (req, res) => {
  const { page = 1, limit = 20, favorite = false} = req.query;
  const skip = (page - 1) * limit
  const result = await Product.find({ }, '', { skip, limit }).populate('vendor_id')
  res.json(result)
}

const getProductById = async (req, res) => {
    const { productId } = req.params
    const result = await Product.findById(productId)
    if (!result) {
      throw HttpError(404, `Product with ${productId} not found`)
    }
    res.json(result)
}

const addProduct = async (req, res) => {
    const {_id: vendor_id} = req.user
    const result = await Product.create({ ...req.body, vendor_id });
      if (!result) {
        throw HttpError(400)
      }
    res.status(201).json(result);
}

const removeProduct = async (req, res) => {
    const { productId } = req.params
    const result = await Product.findByIdAndDelete(productId)
    if (!result) {
      throw HttpError(404, `Product with ${productId} not found`)
    }
    res.status(200).json({message: "Product deleted"})
  }

const updateProductById = async (req, res) => {
    const { productId } = req.params
    const result = await Product.findByIdAndUpdate(productId, req.body, {new: true})
    if (!result) {
      throw HttpError(404, `Product with ${productId} not found`)
    }
    if (JSON.stringify(req.body) === '{}') {
      throw HttpError(400, 'missing fields')
    }
    res.json(result)
}

module.exports = {
    listProducts: ctrlWrapper(listProducts),
    getProductById: ctrlWrapper(getProductById),
    addProduct: ctrlWrapper(addProduct),
    removeProduct: ctrlWrapper(removeProduct),
    updateProductById: ctrlWrapper(updateProductById),
}