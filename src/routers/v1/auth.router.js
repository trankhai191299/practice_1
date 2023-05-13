const express = require('express')
const authController = require('../../controllers/auth.controller')

const authRouter = express.Router()

authRouter.post('/signup',authController.signup())
authRouter.post('/signin',authController.signin())

module.exports = authRouter