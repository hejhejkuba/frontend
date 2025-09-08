import { Link, useNavigate } from 'react-router-dom';
import "../styles/navbar.css"

const Navbar = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">Dashboard</Link>

                {/* Health Check tylko dla admina */}
                {roles.includes("admin") && (
                    <Link to="/health">Health Check</Link>
                )}
            </div>

            <div className="navbar-right">
                {/* Jeśli brak tokena: pokazujemy Login/Register */}
                {!token && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}

                {/* Jeśli token istnieje: pokazujemy Logout */}
                {token && (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
