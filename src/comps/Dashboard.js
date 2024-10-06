import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [gateStatus, setGateStatus] = useState('closed');

    const openGate = async () => {
        try {
            await axios.post('https://mp.seatbook.sk/api/vehicle', { action: 'open' });
            setGateStatus('open');
        } catch (error) {
            console.error('Error opening gate:', error);
        }
    };

    const closeGate = async () => {
        try {
            await axios.post('https://mp.seatbook.sk/api/vehicle', { action: 'close' });
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