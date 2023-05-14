const {User} = require('../models')
const {AppError} = require('../helpers/error')

//get all user
const getAllUser = async() =>{
    try {
        const users = await User.findAll()
        return users
    } catch (error) {
        throw error
    }
}
//get user by id
const getUserById = async(id)=>{
    try {
        const user = await User.findOne({
            where:{
                id
            }
        })
        // const user = await User.findByPk(id)
        if(!user){
            throw new AppError(404,'user not found')
        }
        return user
    } catch (error) {
        throw error
    }
}
//update
const updateUser = async(data,requesterId)=>{
    try {
        if(data.id !== requesterId){
            throw new AppError(403,'No Permission')
        }
        const user = await User.findOne({
            where:{
                id:data.id
            }
        })
        if(!user){
            throw new AppError(404,'user not found')
        }
        await user.update(data,{
            where:{
                id:requesterId
            }
        })
        return user
    } catch (error) {
        throw error
    }
}
//delete
const deleteUser = async(id)=>{
    try {
        const user = await User.findByPk(id)
        if(!user){
            throw new AppError(404,"user not found")
        }
        await User.destroy(user)
        const users = await User.findAll()
        const data = {
            users,
            msg:"delete success"
        }
        return data
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
}