// src/pages/HealthCheck.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const HealthCheck = () => {
    const [status, setStatus] = useState('');
    const [dbStatus, setDbStatus] = useState('');

    useEffect(() => {
        axios.get('/api/health')
            .then(res => setStatus(res.data.status))
            .catch(() => setStatus('error'));

        axios.get('/api/db-check')
            .then(res => setDbStatus(`DB OK, users: ${res.data.users}`))
            .catch(() => setDbStatus('DB error'));
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Health Check</h2>
            <p>API status: <strong>{status}</strong></p>
            <p>Database: <strong>{dbStatus}</strong></p>
        </div>
    );
};

export default HealthCheck;
