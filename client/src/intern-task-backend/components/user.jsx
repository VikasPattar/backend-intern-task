import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import axios from 'axios';
import Loading from './loading';
const BASE_URL = import.meta.env.BASE_URL;

const UserPage = ({ onLogout }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending'
    });
    const [error, setError] = useState(null);

   
    const API_BASE_URL = 'http://localhost:4000/user/tasks'; 

    const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : `${localStorage.getItem('token')}`
        }
    });


    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    // Fetch all tasks
    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get('/read');
            if (!response.data.success) {
                console.log(response.errorMsg)
                console.log(response.message)
            }
            else{
                setTasks(response.data.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch tasks');
            console.error('Error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    // Create or Update task
    const handleSubmit = async () => {
        if (!formData.title || !formData.description) {
            setError('Title and description are required');
            return;
        }
        
        try {
            setLoading(true);
            setError(null);

            if (editingTask) {
                // Update existing task
                const response = await axiosInstance.put(
                    `/update/${editingTask._id}`,
                    formData
                );

                if (!response.data.success) {
                    console.log(response.data.errorMsg)
                    console.log(response.data.message)
                }else{
                    // setTasks(tasks.map(task => 
                    //     task._id === editingTask._id ? response.data.data : task
                    // ));
                    fetchTasks()
                }
            } else {
                // Create new task
                const response = await axiosInstance.post('/create', formData);

                if (!response.data.success) {
                    console.log(response.data.errorMsg)
                    console.log(response.data.message)
                }else{
                    // setTasks([...tasks, response.data.data]);
                    fetchTasks()
                }
            }

            setFormData({ title: '', description: '', status: 'pending' });
            setShowForm(false);
            setEditingTask(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save task');
            console.error('Error saving task:', err);
        } finally {
            setLoading(false);
        }
    };

    // Delete task
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await axiosInstance.delete(`/delete/${id}`);

            if (!response.data.success) {
                console.log(response.data.errorMsg)
                console.log(response.data.message)
            }else{
                setTasks(tasks.filter(task => task._id !== id));
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete task');
            console.error('Error deleting task:', err);
        } finally {
            setLoading(false);
        }
    };

    // Edit task - populate form
    const handleEdit = (task) => {
        setEditingTask(task);
        setFormData({
            title: task.title,
            description: task.description,
            status: task.status
        });
        setShowForm(true);
        setError(null);
    };

    // Cancel form
    const handleCancel = () => {
        setShowForm(false);
        setEditingTask(null);
        setFormData({ title: '', description: '', status: 'pending' });
        setError(null);
    };

    // Calculate stats
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return 'bg-cyan-100 text-cyan-800 border-cyan-300';
            case 'in-progress': return 'bg-cyan-300 text-cyan-900 border-cyan-500';
            case 'completed': return 'bg-cyan-600 text-white border-cyan-700';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'pending': return <AlertCircle size={16} />;
            case 'in-progress': return <Clock size={16} />;
            case 'completed': return <CheckCircle size={16} />;
            default: return null;
        }
    };

    return (
        <div className="bg-gradient-to-br from-cyan-200 to-gray-700 w-full min-h-screen">
            {/* Header */}
            <div className="py-5 px-8 border-b-2 border-cyan-900 bg-white bg-opacity-90">
                <div className="flex justify-between items-center">
                    <div className="font-bold text-2xl text-cyan-900">Task Manager - User</div>
                    <div className="flex gap-2">
                        <div 
                            className="p-2 px-4 hover:bg-cyan-500 hover:text-white rounded-full cursor-pointer transition-colors"
                            onClick={onLogout}
                        >
                            Logout
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="p-8">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-cyan-900 mb-6">My Tasks</h1>
                    
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                            <p className="font-semibold">Error: {error}</p>
                        </div>
                    )}

                    {/* Loading Indicator */}
                    {loading && (
                        // <div className="bg-cyan-100 border-2 border-cyan-400 text-cyan-700 px-4 py-3 rounded-lg mb-6">
                        //     <p className="font-semibold">Loading...</p>
                        // </div>
                        <Loading/>
                    )}
                    
                    {/* Task Stats */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-5 rounded-lg border-2 border-cyan-200">
                            <h3 className="font-semibold text-gray-700 mb-1">Total Tasks</h3>
                            <p className="text-3xl font-bold text-cyan-800">{totalTasks}</p>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 p-5 rounded-lg border-2 border-cyan-300">
                            <h3 className="font-semibold text-gray-700 mb-1">Pending</h3>
                            <p className="text-3xl font-bold text-cyan-800">{pendingTasks}</p>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-200 to-cyan-300 p-5 rounded-lg border-2 border-cyan-400">
                            <h3 className="font-semibold text-gray-700 mb-1">In Progress</h3>
                            <p className="text-3xl font-bold text-cyan-900">{inProgressTasks}</p>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 p-5 rounded-lg border-2 border-cyan-800">
                            <h3 className="font-semibold text-cyan-50 mb-1">Completed</h3>
                            <p className="text-3xl font-bold text-white">{completedTasks}</p>
                        </div>
                    </div>

                    {/* Add Task Button */}
                    {!showForm && (
                        <div className="mb-6">
                            <button 
                                onClick={() => setShowForm(true)}
                                disabled={loading}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Plus size={20} />
                                Add New Task
                            </button>
                        </div>
                    )}

                    {/* Task Form */}
                    {showForm && (
                        <div className="bg-cyan-50 rounded-lg shadow-md p-6 mb-6 border-2 border-cyan-300">
                            <h2 className="text-xl font-semibold text-cyan-900 mb-4">
                                {editingTask ? 'Edit Task' : 'Create New Task'}
                            </h2>
                            <div>
                                <div className="mb-4">
                                    <label className="block text-cyan-900 font-medium mb-2">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-cyan-300 rounded-lg focus:outline-none focus:border-cyan-600"
                                        placeholder="Enter task title"
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-cyan-900 font-medium mb-2">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-cyan-300 rounded-lg focus:outline-none focus:border-cyan-600 h-24"
                                        placeholder="Enter task description"
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-cyan-900 font-medium mb-2">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-cyan-300 rounded-lg focus:outline-none focus:border-cyan-600"
                                        disabled={loading}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        disabled={loading}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Tasks List */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4 text-cyan-900">Task List</h2>
                        <div className="space-y-4">
                            {tasks.length === 0 && !loading ? (
                                <div className="border-2 border-dashed border-cyan-300 rounded-lg p-8 text-center">
                                    <p className="text-gray-500 text-lg">No tasks yet. Click "Add New Task" to create one!</p>
                                </div>
                            ) : (
                                tasks.map(task => (
                                    <div 
                                        key={task._id} 
                                        className="bg-white rounded-lg shadow-md p-5 border-l-4 border-cyan-500 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold text-cyan-900 mb-2">{task.title}</h3>
                                                <p className="text-gray-700 mb-3">{task.description}</p>
                                                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border-2 ${getStatusColor(task.status)}`}>
                                                    {getStatusIcon(task.status)}
                                                    {task.status.replace('-', ' ').toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 ml-4">
                                                <button
                                                    onClick={() => handleEdit(task)}
                                                    disabled={loading}
                                                    className="bg-cyan-100 hover:bg-cyan-200 text-cyan-700 p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Edit task"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(task._id)}
                                                    disabled={loading}
                                                    className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Delete task"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;