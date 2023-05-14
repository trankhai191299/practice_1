const {response} = require('../helpers/response')
const userService = require('../services/user.service')

const getAllUser = ()=>{
    return async(req,res,next)=>{
        try {
            const users = await userService.getAllUser()
            res.status(200).json(response(users))
        } catch (error) {
            next(error)
        }
    }
}
const getUserById = ()=>{
    return async(req,res,next)=>{
        try {
            const {id} = req.params
            const user = await userService.getUserById(id)
            res.status(200).json(response(user))
        } catch (error) {
            next(error)
        }
    }
}
const updateUser = () =>{
    return async(req,res,next)=>{
        try {
            const data = req.body
            const {id} = res.locals
            const updatedUser = await userService.updateUser(data,id)
            res.status(200).json(response(updatedUser))
        } catch (error) {
            next(error)
        }
    }
}
const deleteUser = () =>{
    return async(req,res,next)=>{
        try {
            const {id} = req.params
            const data = await userService.deleteUser(id)
            res.status(200).json(response(data))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
}