const { Category } = require('../models/category')

const { ctrlWrapper } = require('../utils')

const { HttpError } = require('../helpers')

const listCategories = async (req, res) => {
    const result = await Category.find()
    res.json(result)
}

const addCategory = async (req, res) => {
    const result = await Category.create({ ...req.body });
      if (!result) {
        throw HttpError(400)
      }
    res.status(201).json(result);
}

module.exports = {
    listCategories: ctrlWrapper(listCategories),
    addCategory: ctrlWrapper(addCategory),
}