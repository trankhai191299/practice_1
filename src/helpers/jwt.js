const jwt = require('jsonwebtoken');
const configs = require('../configs');
const EXPIRES_IN = 60 * 60 * 12; // s * m * h

const generateToken = (payload) =>{
    const token = jwt.sign({
        id:payload.id,
        email:payload.email,
    },configs.SECRET_KEY,{
        expiresIn:EXPIRES_IN,
    });

    return {
        token,
        expiresIn:EXPIRES_IN
    };
};

module.exports = {
    generateToken,
}