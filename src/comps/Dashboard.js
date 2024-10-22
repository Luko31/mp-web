import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';  // Import js-cookie

const Dashboard = () => {
    const [gateStatus, setGateStatus] = useState('closed');
    const navigate = useNavigate();
    
    useEffect(() => {
        const access_token = Cookies.get('auth_token');
        if (!access_token) {
            navigate('/login');
        }
    }, [navigate]);

    const openGate = async () => {
        try {
            const access_token = Cookies.get('auth_token');
            await axios.get('https://mp.seatbook.sk/api/vehicle/', { 
                headers: {
                    Authorization: `JWT ${access_token}`
                } 
            });
            setGateStatus('open');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Cookies.remove('auth_token');
                navigate('/login');
            }
            console.error('Error opening gate:', error);
        }
    };

    const closeGate = async () => {
        try {
            await axios.post('https://mp.seatbook.sk/api/vehicle/', { action: 'close' });
            setGateStatus('closed');
        } catch (error) {
            console.error('Error closing gate:', error);
        }
    };

    return (
        <div className='dashboard-container'>
            <h1>Dashboard</h1>
            <button className='dashboard-button' onClick={openGate}>Open Gate</button>
            <button className='dashboard-button' onClick={closeGate}>Close Gate</button>
            <p>Status: Gate is {gateStatus}</p>
        </div>
    );
};

export default Dashboard;