const {response} = require('../helpers/response')
const productService = require('../services/product.service')

const getAllProduct = () =>{
    return async(req,res,next)=>{
        try {
            const prods = await productService.getAllProduct()
            res.status(200).json(response(prods))
        } catch (error) {
            next(error)
        }
    }
}
const getProdById = () =>{
    return async(req,res,next)=>{
        try {
            const {id} = req.params
            const prod = await productService.getProdById(id)
            res.status(200).json(response(prod))
        } catch (error) {
            next(error)
        }
    }
}
const getProdByUserId = () =>{
    return async(req,res,next)=>{
        try {
            const {userId} = req.params
            const prod = await productService.getProdById(userId)
            res.status(200).json(response(prod))
        } catch (error) {
            next(error)
        }
    }
}
const addProduct = () =>{
    return async(req,res,next)=>{
        try {
            const data = req.body
            const {id} = res.locals
            const prods = await productService.addProduct(data,id)
            res.status(200).json(response(prods))
        } catch (error) {
            next(error)
        }
    }
}
const updateProduct = () =>{
    return async(req,res,next)=>{
        try {
            const data = req.body
            const {id} = res.locals
            const prods = await productService.updateProduct(data,id)
            res.status(200).json(response(prods))
        } catch (error) {
            next(error)
        }
    }
}
const deleteProd = () =>{
    return async(req,res,next)=>{
        try {
            const data = req.body
            const {id} = res.locals
            const prod = await productService.deleteProd(data,id)
            res.status(200).json(response(prod))
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    getAllProduct,
    getProdById,
    getProdByUserId,
    addProduct,
    updateProduct,
    deleteProd
}