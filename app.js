const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const productsRouter = require('./routes/api/products-routes')
const authRouter = require('./routes/api/auth-routes')
const categoriesRouter = require('./routes/api/categories-router')
const favoritesRouter = require('./routes/api/favorites-router')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/products', productsRouter)
app.use('/api/auth', authRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/favorites', favoritesRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message })
})

module.exports = app