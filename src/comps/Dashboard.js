import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [gateStatus, setGateStatus] = useState('closed');

    const openGate = async () => {
        try {
            await axios.post('https://mp-server.seatbook.sk/vehicle', { action: 'open' });
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
            await axios.post('https://mp-server.seatbook.sk/vehicle', { action: 'close' });
            setGateStatus('closed');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Cookies.remove('auth_token');
                navigate('/login');
            }
            console.error('Error opening gate:', error);
        }
    };

    return (
        <div className='dashboard-container'>
            <h1>Dashboard</h1>
            <section className="button-row">
            <button className='dashboard-button open' onClick={openGate}>Open Gate</button>
            <button className='dashboard-button close' onClick={closeGate}>Close Gate</button>
            <button className='dashboard-button pedest' onClick={pedest}>Open Pedestrain</button>
            </section>
            <p>Status: Gate is {gateStatus}</p>
        </div>
    );
};

export default Dashboard;