import Home from './pages/home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './components/error';
import Dashboard from './pages/dashboard';

const InternTaskApp = () => {
    return (
        <>

            <Router>
                <Routes>
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </>
    )
}
export default InternTaskApp;