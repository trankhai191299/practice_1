const express = require('express')
const userController = require('../../controllers/user.controller')
const reqRole = require('../../middlewares/requireRole')
const userRouter = express.Router()

userRouter.get('/',userController.getAllUser())
userRouter.get('/:id',userController.getUserById())
userRouter.put('/',userController.updateUser())
userRouter.delete('/:id',reqRole('ADMIN'),userController.deleteUser())

module.exports = userRouter