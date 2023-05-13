const jwt = require('jsonwebtoken');
const EXPIRES_IN = 60 * 60 * 12; // s * m * h

const generateToken = (payload) =>{
    const token = jwt.sign({
        id:payload.id,
        email:payload.email,
    },"abctesting123",{
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