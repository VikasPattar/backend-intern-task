const express = require('express')
const app = express()
const connectDB = require('./db')
const handleError = require('./middleware/errorMiddleware')

connectDB();
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use('/user/auth', require('./routes/auth'))
app.use('/user/tasks', require('./routes/tasks'))


module.exports = app;
