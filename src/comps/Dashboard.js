import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Dashboard = () => {
    const [gateStatus, setGateStatus] = useState('closed');
    const navigate = useNavigate();
    const ws = useRef(null);

    useEffect(() => {
        const access_token = Cookies.get('auth_token');
        if (!access_token) {
            navigate('/login');
        } else {
            ws.current = new WebSocket(`wss://${process.env.REACT_APP_SERVER_DOMAIN}/ws/gate/?token=${access_token}`);
            ws.current.onmessage = (event) => {
                const message = JSON.parse(event.data);
                console.log(message)
                if (message.message === 'open_v') {
                    setGateStatus('open for vehicle');
                } else if (message.message === 'open_p') {
                    setGateStatus('open for pedestrian');
                } else if (message.message === 'closed') {
                    setGateStatus('closed');
                } else if (message.message === 'not_closed') {
                    setGateStatus('not closed');
                }
            };
            ws.current.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        }

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [navigate]);

    const openGateVehicle = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send("start_v");
        }
    };

    const openGatePedestrian = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send("start_p");
        }
    };

    return (
        <div className='dashboard-container'>
            <h1>Dashboard</h1>
            <button className='dashboard-button' onClick={openGateVehicle}>Open Gate</button>
            <button className='dashboard-button' onClick={openGatePedestrian}>Open Gate Pedestrian</button>
            <p>Status: Gate is {gateStatus}</p>
        </div>
    );
};

export default Dashboard;