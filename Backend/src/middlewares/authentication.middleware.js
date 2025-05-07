
const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../exceptions/httpExceptions");

const {JWT_SECRET}=require('../config/index')

const authorizeRole = (requiredRole) => (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            throw new UnauthorizedError("Invalid JWT");
        }
    
        const decoded = jwt.verify(token, JWT_SECRET);
        
        if (!decoded ||!decoded.roles || !decoded.roles.includes(requiredRole)) {
            throw new UnauthorizedError("Unauthorized User");
        }
    
        next();
    } catch (error) {
        next(error);
    }
};

const isAdmin=authorizeRole("Admin");
const isSystemOwner=authorizeRole("SystemOwner");
const isUser=authorizeRole("User")

module.exports={isAdmin,isUser,isSystemOwner}