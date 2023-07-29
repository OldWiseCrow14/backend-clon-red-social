require('dotenv').config()

const express = require('express')
const helmet = require('helmet') //api de seguridad
const cors = require('cors')  // habilitacion de multiples origenes

const {mongodbconnect}=require('./database/connection')
const user_routes = require('./routes/user.rote')

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(user_routes)


mongodbconnect(()=>app.listen(process.env.PORT))
