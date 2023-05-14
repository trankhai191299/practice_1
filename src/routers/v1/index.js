const express = require('express')
const authRouter = require('./auth.router')
const userRouter = require('./user.router')
const prodRouter = require('./prod.router')
const v1 = express.Router()
//sign up - sign in
v1.use('/auth',authRouter)
//user
v1.use('/user',userRouter)
//product
v1.use('/prod',prodRouter)
//
module.exports = v1