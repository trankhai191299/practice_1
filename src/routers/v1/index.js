const express = require('express')
const authRouter = require('./auth.router')

const v1 = express.Router()
//sign up - sign in
v1.use('/auth',authRouter)
//user

//product

module.exports = v1