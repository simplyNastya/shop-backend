const { Schema, model } = require('mongoose')
const { handleMongooseError } = require('../helpers')

const Joi = require('joi')

const favoriteSchema = new Schema(
  {
    // photo: {
    //   type: String,
    //   ref: "product",
    // },
    // category: {
    //   type: String,
    //   enum: ["Children world", "Real estate", "Auto", "Pet", "House and garden equipment", "Electronics", "Business and services", "Fashion and style", "Hobby, vacation and sport"],
    //   ref: "product",
    //   required: true,
    // },
    // title: {
    //   type: String,
    //   maxLength: 60,
    //   ref: "product",
    //   required: true,
    // },
    // subtitle: {
    //   type: String,
    //   maxLength: 100,
    //   ref: "product",
    //   required: true,
    // },
    // description: {
    //   type: String,
    //   maxLength: 500,
    //   ref: "product",
    //   required: true,
    // },
    // status: {
    //   type: String,
    //   ref: "product",
    //   enum: ["new", "used"],
    //   required: true,
    // },
    // price: {
    //   type: Number,
    //   ref: "product",
    //   required: true,
    // },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    //   required: true,
    },
  },
  { versionKey: false, }
);

favoriteSchema.post("save", handleMongooseError);

// const addFavoriteSchema = Joi.object({
//   name: Joi.string().required(),
// });

// const schemas = {
//   addFavoriteSchema,
// };

const Favorite = model("favorite", favoriteSchema);

module.exports = {
    Favorite,
    // schemas,
};