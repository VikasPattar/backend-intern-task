const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type: String,
        unique : true,
        required : true
    },
    passwordHash : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["user", "admin"],
        required : true
    }
    // created : {
    //     type : Date,
    //     default : Date.now()
    // },
    // lastUpdated : {
    //     type : Date,
    //     default : Date.now()
    // }
})

const User = mongoose.model('User',userSchema);

module.exports = User;