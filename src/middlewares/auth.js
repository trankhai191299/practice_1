// middleware verify token

const jwt = require('jsonwebtoken');
const { AppError } = require("../helpers/error");
const {User} = require('../models');

const extractTokenfromHeader = (headers) =>{
    const bearerToken = headers.authorization; 
    const parts = bearerToken.split(' '); 
    if(parts.length !== 2 || parts[0]!= "Bearer" || !parts[1].trim()){
        next(new AppError(401,"Invalid Token"));
    };

    return parts[1];
};

const authorization = async (req,res,next)=>{
    try {
        const token = extractTokenfromHeader(req.headers);
        const payload = jwt.verify(token,"abctesting123");
        const user = await User.findByPk(payload.id);
        if(!user){
            next(new AppError(401,"Invalid Token"));
        };

        res.locals.user = user;

        next();
    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError){
            next(new AppError(401,"Invalid Token"));
        };
        next(error) ;
    }
};

module.exports = authorization