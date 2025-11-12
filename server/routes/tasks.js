const express = require('express')
const router = express.Router()
const userAuthMiddleware = require('../middleware/userAuthMiddleware')
const {createTask, readTasks, updateTask, deleteTask } = require('../controllers/taskDataController')

router.post('/create', userAuthMiddleware, async (req, res)=>{
    try {
        let userId = req.authData.id
        let {title, description, status} = req.body;
        let taskCreate = {user : userId, title, description, status}
        let created = await createTask(taskCreate);
        res.status(200).send({
            success : true,
            data : created
        })
    } catch (error) {
        res.status(400).send({
            success : false,
            message : "Task creation failed",
            errorMsg : error.message
        })
    }
})

router.get('/read', userAuthMiddleware, async (req, res)=>{
    try{
        let userId = req.authData.id
        let tasks = await readTasks(userId)
        res.status(200).send({
            success : true,
            data : tasks
        })
    }catch(error){
        res.send({
            success : false,
            errorMsg : error.message,
            message : "Couldn't fetch tasks for the user"
        })
    }
})

router.put('/update/:id', userAuthMiddleware, async (req, res, next)=>{
    try{
        let taskId = req.params.id
        let {title, description, status}  = req.body;

        let taskUpdate ={}
        if (title) taskUpdate.title = title;
        if(description) taskUpdate.description = description;
        if(status) taskUpdate.status = status;

        let updated = await updateTask(taskId, taskUpdate)
        res.status(200).send({
            success : true,
            data : updated
        })
    }catch(error){
        res.send({
            success : false,
            errorMsg : error.message,
            message : "Failed to update task"
        })
    }
})

router.delete('/delete/:id', userAuthMiddleware,async (req, res, next)=>{
    try{
        let taskId = req.params.id
        let deleted = await deleteTask(taskId)
        res.status(200).send({
            success : true,
            data : deleted
        })
    }catch(error){
        res.status(400).send({
            success : false,
            errorMsg : error.message,
            message : "Task deletion failed"
        })
    }
})

module.exports = router