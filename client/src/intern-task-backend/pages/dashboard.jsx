import { useEffect, useState } from "react";
import AdminPage from "../components/admin";
import UserPage from "../components/user";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null); // ✅ null = unknown yet
  const [userRole, setUserRole] = useState(null);

  const handleLogout = () => {
    if(!window.confirm("Are you want to logout?")){
        return
    }
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserRole(null);
    navigate("/"); 
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsLoggedIn(true);
        setUserRole(parsedUser?.role || null);
      } catch (err) {
        console.error("Invalid user JSON:", err);
        localStorage.removeItem("user");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    // ✅ Only run after isLoggedIn is determined (not null)
    if (isLoggedIn === false) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // ✅ Don’t render anything until login state is known
  if (isLoggedIn === null) {
    return <Loading/>;
  }

  // ✅ Render based on user role
  return userRole === "admin" ? (
    <AdminPage onLogout={handleLogout} />
  ) : (
    <UserPage onLogout={handleLogout} />
  );
};

export default Dashboard;
