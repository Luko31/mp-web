import React, { useState } from 'react';
import './Dashboard.css';


const Dashboard = () => {
    const [gateStatus, setGateStatus] = useState('closed');

    const openGate = () => setGateStatus('open');
    const closeGate = () => setGateStatus('closed');

    return (
        <div className='dashboard-container '>
            <h1>Dashboard</h1>
            <button className='dashboard-button' onClick={openGate}>Open Gate</button>
            <button className='dashboard-button' onClick={closeGate}>Close Gate</button>
            <p>Status: Gate is {gateStatus}</p>
        </div>
    );
};

export default Dashboard;