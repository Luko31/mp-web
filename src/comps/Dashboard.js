import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Dashboard = () => {
    const [gateState, setGateState] = useState('closed');
    const navigate = useNavigate();
    const ws = useRef(null);

    useEffect(() => {
        const access_token = Cookies.get('auth_token');
        if (!access_token) {
            navigate('/login');
            return; // Stop executing the next code
        }

        axios.get(`https://${process.env.REACT_APP_SERVER_DOMAIN}/api/gate-state/`, {
            headers: {
              Authorization: `JWT ${access_token}`
            }
        }).then(response => {
            updateGateState(response.data.message);
        }).catch(() => {
            console.error('Failed to fetch gate state');
            updateGateState('unknown');
        });

        ws.current = new WebSocket(`ws://${process.env.REACT_APP_SERVER_DOMAIN}/ws/gate/?token=${access_token}`);
        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message)
            if (message.type === 'status') {
                updateGateState(message.message);
            }
        };
        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [navigate]);

    const openGateVehicle = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send("{\"type\": \"trigger\", \"message\": \"start_v\" }");
        }
    };

    const openGatePedestrian = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send("{\"type\": \"trigger\", \"message\": \"start_p\" }");
        }
    };

    function updateGateState(gate_status) {
        switch (gate_status) {
            case 'open_v':
                setGateState('open for vehicle');
                break;
            case 'open_p':
                setGateState('open for pedestrian');
                break;
            case 'closed':
                setGateState('closed');
                break;
            case 'not_closed':
                setGateState('not closed');
                break;
            default:
                setGateState('unknown');
        }
    }

    return (
        <div className='dashboard-container'>
            <h1>Dashboard</h1>
            <button className='dashboard-button' onClick={openGateVehicle}>Open Gate</button>
            <button className='dashboard-button' onClick={openGatePedestrian}>Open Gate Pedestrian</button>
            <p>Status: Gate is {gateState}</p>
        </div>
    );
};

export default Dashboard;