import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {    
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, password });
            navigate('/login');
        } catch (err) {
            alert('User already exists');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Register</h2>
                <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
}
