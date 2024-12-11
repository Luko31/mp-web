import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';  // Import js-cookie
import { useSpring } from 'react-spring';  // Assuming you are using react-spring for animations

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add this state
  const navigate = useNavigate();

  // Animace formuláře
  const formAnimation = useSpring({
    opacity: isSubmitted ? 0 : 1,
    transform: isSubmitted ? 'translateY(-20px)' : 'translateY(0)',
    config: { tension: 280, friction: 60 },
  });

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      axios.get(`https://${process.env.REACT_APP_SERVER_DOMAIN}/api/auth/users/me/`, {
        headers: {
          Authorization: `JWT ${token}`
        }
      }).then(userResponse => {
        Cookies.set('user_id', userResponse.data.id, { expires: 7 });
        setIsAuthenticated(true); // Set authenticated state
        navigate('/'); // Redirect to dashboard
      }).catch(() => {
        Cookies.remove('auth_token');
      });
    }
  }, [navigate]);

  if (isAuthenticated) {
    return null; // Don't render the login form if authenticated
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      const response = await axios.post(`https://${process.env.REACT_APP_SERVER_DOMAIN}/api/auth/jwt/create/`, {
        username,
        password
      });

      // Set the JWT token as a cookie
      Cookies.set('auth_token', response.data.access, { expires: 7 });

      // Fetch the user details (assuming the backend has an endpoint for it)
      const userResponse = await axios.get(`https://${process.env.REACT_APP_SERVER_DOMAIN}/api/auth/users/me/`, {
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
    <div style={formAnimation}>
      <h2>Login</h2>
      <p>Test message: LoginForm is rendering</p> {/* Add this line */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;