const { Schema, model } = require('mongoose')
const Joi = require('joi')

const { handleMongooseError } = require('../helpers')

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    miinlength: 6,
  },
  email: {
    type: String,
    match: emailRegexp,
    required: [true, 'Email is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required'],
  },
  avatar: {
    type: String,
  },
  birthday: {
    type: String,
    required: [true, 'Birthday is required'],
  },
  phone: {
    type: Number,
    required: [true, 'Phone is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  lat: String,
  lang: String,
  favorites: {
    type: Array,
    default: [],
  },
  token: String,
}, { timestamps: { createdAt: 'created_at' }, versionKey: false })

userSchema.post('save', handleMongooseError)

const userRegisterSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  username: Joi.string().required(),
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  avatar: Joi.string(),
  birthday: Joi.string().required(),
  phone: Joi.number().required(),
  location: Joi.string().required(),
});

const userLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});
  
const schemas = {
  userRegisterSchema,
  userLoginSchema,
}

const User = model('user', userSchema)

module.exports = {
    User, 
    schemas,
}