const express = require('express')
const prodController = require('../../controllers/product.controller')
const prodRouter = express.Router()

prodRouter.get('/',prodController.getAllProduct())
prodRouter.get('/user/:id',prodController.getProdByUserId())
prodRouter.get('/:id',prodController.getProdById())
prodRouter.post('/')
module.exports = prodRouter