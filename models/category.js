const { Schema, model } = require('mongoose')
const { handleMongooseError } = require('../helpers')

const Joi = require('joi')

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for your category"],
    },
  },
  { versionKey: false, }
);

categorySchema.post("save", handleMongooseError);

const addCategorySchema = Joi.object({
  name: Joi.string().required(),
});

const schemas = {
  addCategorySchema,
};

const Category = model("category", categorySchema);

module.exports = {
    Category,
    schemas,
};