const {response} = require('../helpers/response')
const authService = require('../services/auth.service')

const signup = () =>{
    return async(req,res,next)=>{
        try {
            const data = req.body
            const userSignUp = await authService.signup(data)
            res.status(200).json(response(userSignUp))
        } catch (error) {
            next(error)
        }
    }
}
const signin = ()=>{
    return async(req,res,next)=>{
        try {
            const data = req.body
            const userSignin = await authService.signin(data)
            res.status(200).json(response(userSignin)) 
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    signup,
    signin
}