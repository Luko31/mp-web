import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';  
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

React.useEffect(() => {
  const checkToken = async () => {
    const token = Cookies.get('auth_token');
    if (token) {
      // Fetch the user details (assuming the backend has an endpoint for it)
      const userResponse = await axios.get('https://mp.seatbook.sk/api/auth/users/me/', {
        headers: {
          Authorization: `JWT ${token}`
        }
      });

      // Store the user ID as a cookie
      Cookies.set('user_id', userResponse.data.id, { expires: 7 });
      console.log('user_id', userResponse.data.id);
      navigate('/'); // Redirect to dashboard
    }
  };

  checkToken();
}, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://mp-server.seatbook.sk/auth/jwt/create/', {
        username,
        password
      });

      // Set the JWT token as a cookie
      Cookies.set('auth_token', response.data.access, { expires: 7 });

      // Fetch the user details (assuming the backend has an endpoint for it)
      const userResponse = await axios.get('https://mp.seatbook.sk/api/auth/users/me/', {
        headers: {
          Authorization: `JWT ${response.data.access}`
        }
      });

      // Store the user ID as a cookie
      Cookies.set('user_id', userResponse.data.id, { expires: 7 });

      navigate('/'); // Redirect to dashboard
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Cookies.remove('auth_token');
        setError('Invalid credentials');
        navigate('/login');
      } 
      if (error.response && error.response.data && error.response.data.detail) {
        setError(error.response.data.detail); 
      } else {
        setError('Login failed.');
      }
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;