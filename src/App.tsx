import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HealthCheck from "./pages/HealthCheck";
import GameViewDetails from "./components/GameViewDetails";
import ProtectedLayout from './components/ProtectedLayout';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Wszystko poniżej zabezpieczone */}
            <Route element={<ProtectedLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/health" element={<HealthCheck />} />
                <Route path="/games/:id" element={<GameViewDetails />} />
            </Route>

            {/* fallback dla złych ścieżek */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;