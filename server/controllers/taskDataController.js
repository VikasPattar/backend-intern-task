const Task = require('../models/taskModel')
const AppError = require('../errors/appError')

const createTask  = async (task)=>{
    try {
        let created = await Task.create(task);
        if(!created) throw new AppError('unable to create', 500, "TASK_NOT_CREATED")
        return created;
    } catch (error) {
        throw error
    }
}
const readTasks = async (userId)=>{
    try {
        const tasks = await Task.find({user : userId})
        if(!tasks) throw new AppError('no tasks found for the user', 500, "TASKS_NOT_FOUND")
        return tasks
    } catch (error) {
        throw error
    }
}

const updateTask = async (taskId, updateData)=>{
    try {
        let updated = await Task.findByIdAndUpdate(taskId, updateData, {new : true})
        if(!updated) throw new AppError('updation error', 500, "TASK_NOT_UPDATED")
        return updated;
    } catch (error) {
        throw error
    }
}

const deleteTask = async(taskId)=>{
    try {
        let deleted  = await Task.findByIdAndDelete(taskId)
        if(!deleted) throw new AppError('unable to delete task', 500, 'TASK_NOT_DELETED')
        return deleted;
    } catch (error) {
        throw error
    }
}


module.exports = {createTask, readTasks, updateTask, deleteTask};