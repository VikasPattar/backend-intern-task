const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config({path : path.join(__dirname,'../.env')})
const SECRET = process.env.SECRET_KEY
const AppError = require('../errors/appError')

async function register(user){
    try {
        let {name, email, password, role} = user;
        let salt = await bcrypt.genSalt(10);
        let passwordHash = await bcrypt.hash(password, salt);
        let userReg = {name, email, passwordHash, role}
        const registered = await User.create(userReg)
        if(!registered) throw new AppError('registration error', 500, 'USER_NOT_REGISTERED')
        return registered
    } catch (error) {
        throw error
    }
}


const login = async (loginUser)=>{
    let {email, password} = loginUser
    try{
        const found = await User.findOne({email});
        if(!found) throw new AppError('user not found', 404, "USER_NOT_FOUND")
        const verified = await bcrypt.compare(password, found.passwordHash)
        if(!verified) throw new AppError("password doesn't match", 401, "UNAUTHORISED_USER")
        let data = {
            id : found._id,
            role: found.role
        }
        const token = jwt.sign(data, SECRET, {expiresIn : '1h'})
        return {token, user : found};        
    }catch(error){
        throw error
    }
}

const fetchUser = async  (id)=>{
    try {
        let found = await User.findOne({_id : id})
        if(!found ) throw new Error('User not found')
        return found;
    } catch (error) {
        throw error
    }
}

module.exports = {register, login, fetchUser}