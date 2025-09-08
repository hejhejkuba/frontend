import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {parseJwt} from "../hooks/parseJwt.ts";
import '../styles/login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await axios.post('/api/auth/login', {
            username,
            password,
        });

        const token = response.data.access_token;
        localStorage.setItem('token', token);

        const payload = parseJwt(token);
        localStorage.setItem('roles', JSON.stringify(payload?.roles));


        navigate('/');
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}