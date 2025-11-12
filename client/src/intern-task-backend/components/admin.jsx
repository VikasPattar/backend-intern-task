const AdminPage = ({ onLogout }) => {
    return (
        <div className="bg-gradient-to-br from-cyan-200 to-gray-700 w-full min-h-screen">
            {/* Header */}
            <div className="py-5 px-8 border-b-2 border-cyan-900">
                <div className="flex justify-between">
                    <div className="font-bold text-2xl">Task Manager - Admin</div>
                    <div className="flex gap-2">
                        <div className="p-1 px-3 hover:bg-cyan-500 hover:text-white rounded-full cursor-pointer">
                            Dashboard
                        </div>
                        <div className="p-1 px-3 hover:bg-cyan-500 hover:text-white rounded-full cursor-pointer">
                            Users
                        </div>
                        <div 
                            className="p-1 px-3 hover:bg-cyan-500 hover:text-white rounded-full cursor-pointer"
                            onClick={onLogout}
                        >
                            Logout
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="p-8">
                <div className="bg-white p-6 rounded shadow-lg">
                    <h1 className="text-2xl font-bold text-cyan-900 mb-4">Admin Dashboard</h1>
                    <p className="text-gray-700 mb-6">Welcome Admin! Manage your system here.</p>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-cyan-100 p-4 rounded">
                            <h3 className="font-bold text-lg">Total Users</h3>
                            <p className="text-2xl text-cyan-800">0</p>
                        </div>
                        <div className="bg-cyan-100 p-4 rounded">
                            <h3 className="font-bold text-lg">Total Tasks</h3>
                            <p className="text-2xl text-cyan-800">0</p>
                        </div>
                        <div className="bg-cyan-100 p-4 rounded">
                            <h3 className="font-bold text-lg">Completed</h3>
                            <p className="text-2xl text-cyan-800">0</p>
                        </div>
                    </div>
                    
                    {/* Users Table */}
                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-3">User Management</h2>
                        <table className="w-full border">
                            <thead className="bg-cyan-800 text-white">
                                <tr>
                                    <th className="p-2 border">Name</th>
                                    <th className="p-2 border">Email</th>
                                    <th className="p-2 border">Role</th>
                                    <th className="p-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2 border text-center" colSpan="4">No users yet</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;