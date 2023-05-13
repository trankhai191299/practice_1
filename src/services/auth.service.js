const {User} = require('../models')
const {AppError} = require('../helpers/error')
const bcrypt = require('bcrypt')
const {generateToken} = require('../helpers/jwt')
const signup = async(data)=>{
    try {
        const user = await User.findOne({
            where:{
                email:data.email
            }
        })
        if(user){
            throw new AppError(401,'email existed')
        }
        const userSignUp = await User.create(data)
        return userSignUp
    } catch (error) {
        
    }
}
const signin = async(data)=>{
    const {email,password} = data;
    if(!email||!password){
        throw new AppError(400,'email or password invalid')
    }
    const user = await User.findOne({
        where:{
            email
        },
        attributes:{
            include:['password']
        }
    })
    if(!user){
        throw new AppError(400,'email or password invalid')
    }
    const isMatched = bcrypt.compareSync(password,user.password)
    if(!isMatched){
        throw new AppError(400,'email or password invalid')
    }
    return generateToken(user)
}
module.exports = {
    signup,
    signin
}