const jwt = require("jsonwebtoken");
const {JWT_SECRET}= require("../config/index.js");
const createToken = (userId, roles) => {
    const jwtToken = jwt.sign(
        { userId, roles }, 
        JWT_SECRET ,  
        { expiresIn: "24h" }
    );

    return jwtToken;
};

module.exports =  createToken ;