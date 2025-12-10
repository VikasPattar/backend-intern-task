const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path : "./.env"})
const MONGO_URL = process.env.MONGO_URL
const connectDB = ()=>{
    try {
        mongoose.connect(`${MONGO_URL}`)
        console.log('app is connected to mongo server')
    } catch (error) {
        throw error;
    }
}

module.exports = connectDB;