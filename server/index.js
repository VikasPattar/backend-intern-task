const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000
const internTask = require('./intern-task-app')

app.use(cors())
app.use(internTask)

app.listen(port, ()=>{
    console.log(`app is listening to the port ${port}`)
})