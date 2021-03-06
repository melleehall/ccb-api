require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const {CLIENT_ORIGIN} = require('./config');
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./error-handler')
const contactsRouter = require('./contacts/contacts-router')

const app = express()

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))
app.use(cors())
// app.use(
//   cors({
//       origin: CLIENT_ORIGIN
//   })
// );
app.use(helmet())

app.use('/api/contacts', contactsRouter)

// route to quickly test connection
app.get('/', (req, res) => {
  res.send('Hello, world!  See API documentation here: https://github.com/melleehall/ccb-api')
})

// last piece of middleware to handle any errors
app.use(errorHandler)

module.exports = app
