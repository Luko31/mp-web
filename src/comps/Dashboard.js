import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';  

const Dashboard = () => {
    const [gateStatus, setGateStatus] = useState('closed');
    const navigate = useNavigate();
    console.log(Cookies.get('auth_token'));
    useEffect(() => {
        const access_token = Cookies.get('auth_token');
        if (!access_token) {
            navigate('/login');
        }
    }, [navigate]);

    const openGate = async () => {
        try {
            const access_token = Cookies.get('auth_token');
            await axios.post('https://mp.seatbook.sk/api/trigger/', {"trigger_type":"start"}, { 
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
            const access_token = Cookies.get('auth_token');
            await axios.post('https://mp.seatbook.sk/api/trigger/', {"trigger_type":"stop"}, { 
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


    const pedest = async () => {
        try {
            const access_token = Cookies.get('auth_token');
            await axios.get('https://mp.seatbook.sk/api/trigger/', {"trigger_type":"start_p"}, { 
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