const {Product,User} = require('../models')
const {AppError} = require('../helpers/error')

const getAllProduct = async() =>{
    try {
        const prods = await Product.findAll({
            include:{
                model:User,
                attributes:['name']
            }
        })
        return prods
    } catch (error) {
        throw error
    }
}
const getProdById = async(id) =>{
    try {
        const prod = await Product.findByPk(id,{
            include:{
                model:User,
                attributes:['name']
            }
        })
        if(!prod){
            throw new AppError(404,'product not found')
        }
        return prod
    } catch (error) {
        throw error
    }
}
const getProdByUserId = async(userId)=>{
    try {
        const user = await User.findByPk(userId)
        if(!user){
            throw new AppError(404,"user not found")
        }
        const prod = await user.getProducts()
        if(!prod){
            throw new AppError(404,'no product found')
        }
        return prod
    } catch (error) {
        throw error
    }
}
const addProduct = async(data,userId)=>{
    try {
        const {name} = data
        const user = await User.findByPk(userId)
        if(!user){
            throw new AppError(404,'user not found')
        }
        await user.addProducts(userId,{through:{name}})
        const prods = await user.getProducts()
        return prods
    } catch (error) {
        throw error
    }
}
const updateProduct = async(data,requesterId)=>{
    try {
        const {id,userId} = data
        if(userId!==requesterId){
            throw new AppError(403,"no permission")
        }
        const requester = await User.findByPk(requesterId)
        if(!requester){
            throw new AppError(404,'user not found')
        }
        const prod = await Product.findByPk(id)
        if(!prod){
            throw new AppError(404,'no product found')
        }
        await prod.update(data)
        await prod.save()
        return prod
    } catch (error) {
        
    }
}
const deleteProd = async(data,requesterId)=>{
    try {
        const {id,userId} = data
        if(userId!==requesterId){
            throw new AppError(403,"no permission")
        }
        const prod = await Product.findByPk(id)
        if(!prod){
            throw new AppError(404,'no product found')
        }
        const requester = await User.findByPk(requesterId)
        if(!requester){
            throw new AppError(404,'user not found')
        }
        await requester.removeProduct(id)
        const prods = await requester.getProducts()
        return prods
    } catch (error) {
        throw error
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