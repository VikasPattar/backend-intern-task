const jwt= require('jsonwebtoken')
const path = require('path')
const User = require('../models/userModel')
require('dotenv').config({path : path.join(__dirname, '../.env')})
const SECRET = process.env.SECRET_KEY

const userAuthMiddleware = async (req, res, next)=>{
    try {
        // extract the token
        let token = req.headers['auth-token']
        if(!token) throw new Error('token not found')
        // verify the token
        let data = jwt.verify(token, SECRET)
        if(!data) throw new Error('Unable to verify token')

        // find for presence of user in the database
        let found = await User.findOne({_id : data.id})
        if(!found) throw new Error('User not found')
            
        //embedd the verified data in the request object
        req.authData = data;
        next();
    } catch (error) {
        res.send({
            success : false,
            error,
            message : error.message
        })
    }
}

module.exports = userAuthMiddleware;