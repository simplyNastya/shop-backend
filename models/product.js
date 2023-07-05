const { Schema, model } = require('mongoose')
const { handleMongooseError } = require('../helpers')

const Joi = require('joi')

const regEx = /^[^\u0400-\u04FF]*$/;

const productSchema = new Schema(
  {
    photo: {
      type: String,
    },
    category: {
      type: String,
      enum: ["Children world", "Real estate", "Auto", "Pet", "House and garden equipment", "Electronics", "Business and services", "Fashion and style", "Hobby, vacation and sport"],
      required: [true, "Set category of your product"],
    },
    title: {
      type: String,
      maxLength: 60,
      required: [true, "Set title of your product"],
    },
    subtitle: {
      type: String,
      maxLength: 100,
      required: [true, "Set subtitle of your product"],
    },
    description: {
      type: String,
      maxLength: 500,
      required: [true, "Set description of your product. Content of the product"],
    },
    status: {
      type: String,
      enum: ["new", "used"],
    },
    price: {
      type: Number,
      required: [true, "Set price for your product"],
    },
    vendor_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at' }, versionKey: false, }
);

productSchema.post("save", handleMongooseError);

const addProductSchema = Joi.object({
  photo: Joi.string(),
  category: Joi.string()
    .pattern(/^(Children world|Real estate|Auto|Pet|House and garden equipment|Electronics|Business and services|Fashion and style|Hobby, vacation and sport)$/)
    .required()
    .messages({
      "any.required": "missing field category",
    }),
  title: Joi.string().pattern(regEx).required().messages({
    "any.required": "missing required title field",
  }),
  subtitle: Joi.string().pattern(regEx).required().messages({
    "any.required": "missing required subtitle field",
  }),
  description: Joi.string().pattern(regEx).required().messages({
    "any.required": "missing required description field",
  }),
  status: Joi.string()
    .min(0)
    .when("category", {
      is: ["Children world", "Real estate", "Auto", "Pet", "House and garden equipment", "Electronics", "Fashion and style", "Hobby, vacation and sport"],
      then: Joi.string().pattern(/^(new|used)$/).required(),
      otherwise: Joi.optional(),
    })
    .messages({
      "any.required": "missing required status field",
  }),
  price: Joi.number().min(0).required().messages({
      "any.required": "missing required price field",
  }),
});

const putProductSchema = Joi.object({
  photo: Joi.string(),
  category: Joi.string(),
  title: Joi.string(),
  subtitle: Joi.string(),
  description: Joi.string(),
  status: Joi.string().pattern(/^(new|used)$/),
  price: Joi.number().min(0),
}).options({ allowUnknown: false });

const schemas = {
  addProductSchema,
  putProductSchema,
};

const Product = model("product", productSchema);

module.exports = {
    Product,
    schemas,
};