const mongoose = require('mongoose')

const connectDB = ()=>{
    try {
        mongoose.connect('mongodb://localhost:27017/backendAssignment')
        console.log('app is connected to mongo server')
    } catch (error) {
        throw error;
    }
}

module.exports = connectDB;