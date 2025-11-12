import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
const BASE_URL = import.meta.env.BASE_URL;

const api = axios.create({
    baseURL: "http://localhost:4000/user/auth",  // backend endpoint
    headers: {
        "Content-Type": "application/json",
    },
})

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [msg, setMsg] = useState('');
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const resp = await api.post('/login', formData)
            console.log(resp)
            if (!resp.data.success) {
                setMsg("Failed to login")
            }
            localStorage.setItem('token', resp.data.token)
            localStorage.setItem("user", JSON.stringify(resp.data.user)); 
            let token = localStorage.getItem('token')
            console.log('token\n', token)
            setMsg("Login success")
            navigate('/dashboard')
            console.log('navigate has run')
            setLoading(false)
        } catch (error) {
            setMsg("Failed to login")
            console.log(error.message)
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-3 rounded-b">
            {isLoading && <Loading/>}
            {/* email */}
            <div className="flex flex-col mb-3">
                <div>
                    <label htmlFor="email">Email <span className="text-red-900 text-lg">*</span> </label>
                </div>
                <input
                    className="p-2 mt-1 border rounded"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            {/* password */}
            <div className="flex flex-col mb-3">
                <div>
                    <label htmlFor="password">Password <span className="text-red-900 text-lg">*</span> </label>
                </div>
                <input
                    className="p-2 mt-1 border rounded"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            {/* submit button */}
            <div className="text-center my-5">
                <button
                    onClick={handleSubmit}
                    className="text-cyan-200 block w-full p-2 rounded bg-cyan-800 hover:bg-cyan-700"
                >
                    Submit
                </button>
            </div>
            <div className="text-center">{msg}</div>
        </div>
    );
};

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const resp = await api.post('/register', formData)
            if (!resp.data.success){
                setMsg(resp.data.message)
            }
            else {
                console.log(resp.data)
                setMsg('Registration successfull you can login')
            }
        } catch (error) {
            console.log('error message : ' ,error.message)
            setMsg("Failed to register")
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-3 rounded-b">
            {/* name */}
            <div className="flex flex-col mb-3">
                <div>
                    <label htmlFor="name">Name <span className="text-red-900 text-lg">*</span> </label>
                </div>
                <input
                    className="p-2 mt-1 border rounded"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            {/* email */}
            <div className="flex flex-col mb-3">
                <div>
                    <label htmlFor="reg-email">Email <span className="text-red-900 text-lg">*</span> </label>
                </div>
                <input
                    className="p-2 mt-1 border rounded"
                    type="email"
                    id="reg-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            {/* password */}
            <div className="flex flex-col mb-3">
                <div>
                    <label htmlFor="reg-password">Password <span className="text-red-900 text-lg">*</span> </label>
                </div>
                <input
                    className="p-2 mt-1 border rounded"
                    type="password"
                    id="reg-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            {/* role */}
            <div className="flex flex-col mb-3">
                <div>
                    <label>Role <span className="text-red-900 text-lg">*</span> </label>
                </div>
                <div className="flex gap-4 mt-2">
                    <label className="cursor-pointer">
                        <input
                            className="mr-1"
                            type="radio"
                            name="role"
                            value="user"
                            checked={formData.role === 'user'}
                            onChange={handleChange}
                            required
                        />
                        User
                    </label>
                    <label className="cursor-pointer">
                        <input
                            className="mr-1"
                            type="radio"
                            name="role"
                            value="admin"
                            checked={formData.role === 'admin'}
                            onChange={handleChange}
                            required
                        />
                        Admin
                    </label>
                </div>
            </div>
            {/* submit button */}
            <div className="text-center my-5">
                <button
                    onClick={handleSubmit}
                    className="text-cyan-200 block w-full p-2 rounded bg-cyan-800 hover:bg-cyan-700"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

const HomeContent = () => {
    return (
        <div className=" p-8 rounded shadow-2xl mt-5">
            <h1 className="text-3xl font-bold text-cyan-900 mb-4">Welcome to Task Manager</h1>
            <p className="text-gray-700 mb-4">
                Manage your tasks efficiently and stay organized with our simple task management system.
            </p>
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-cyan-800 mb-2">Features:</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Create and manage tasks easily</li>
                    <li>Track your progress</li>
                    <li>Simple and user-friendly interface</li>
                </ul>
            </div>
        </div>
    );
};

const LoginRegisterSection = () => {
    const [activeTab, setActiveTab] = useState('login');
    const tabs = [
        { id: 'login', label: 'Login', element: <Login /> },
        { id: 'register', label: 'Register', element: <Register /> }
    ];

    return (
        <div className="w-1/3">
            {/* header */}
            <div className="flex flex-row rounded-t bg-cyan-900 gap-1 p-1">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`flex-1 p-2 text-center text-lg text-white rounded hover:cursor-pointer ${activeTab === tab.id ? "bg-cyan-500" : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>
            {/* body */}
            {tabs.find(tab => tab.id === activeTab)?.element}
        </div>
    );
};

const Home = () => {
    const [currentPage, setCurrentPage] = useState('home');

    return (
        <div className="bg-gradient-to-br from-cyan-200 to-gray-700 w-full min-h-screen">
            {/* Header container */}
            <div className="py-5 px-8 border-b-2 border-cyan-900">
                {/* Navbar container */}
                <div className="flex justify-between">
                    {/* brand */}
                    <div className="font-bold text-2xl hover:cursor-pointer" onClick={() => setCurrentPage('home')}>
                        Task Manager
                    </div>
                    {/* Nav links container */}
                    <div className="flex gap-2">
                        <div
                            className="p-1 px-3 hover:bg-cyan-500 hover:text-white rounded-full cursor-pointer"
                            onClick={() => setCurrentPage('home')}
                        >
                            Home
                        </div>
                        <div
                            className="p-1 px-3 hover:bg-cyan-500 hover:text-white rounded-full cursor-pointer"
                            onClick={() => setCurrentPage('login')}
                        >
                            Login
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex justify-center mt-5 px-8">
                {currentPage === 'home' ? <HomeContent /> : <LoginRegisterSection />}
            </div>
        </div>
    );
};

export default Home;