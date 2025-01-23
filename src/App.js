import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './comps/LoginForm';
import Dashboard from './comps/Dashboard'; // Assuming you have a Dashboard component
import GateControlApp from './comps/GateControl';
import LoginPage from './comps/LoginPage';
import TempAccessForm from './comps/TempAccessForm';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';


function App() {
  const [authToken, setAuthToken] = useState(
    () => Cookies.get('auth_token')
  );
  
  useEffect(() => {
    if (authToken) {
      Cookies.set('auth_token', authToken, { expires: 7 });
    } else {
      Cookies.remove('auth_token');
    }
  }, [authToken]);

  const logIn = () => {
    setAuthToken(Cookies.get('auth_token'));
  };

  // pass this callback to components you want to allow logging out
  // it will update the local state and then get persisted
  const logOut = () => setAuthToken("");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login-old" element={<LoginForm />} />
          <Route path="/login" element={<LoginPage onLogIn={logIn} replace={true}/>} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
          <Route path="/" element={authToken ? <GateControlApp onLogOut={logOut}/> : <Navigate to='/login' state={"/"}/>}/>
          <Route path="/temp-access" element={authToken ? <TempAccessForm onLogOut={logOut}/> : <Navigate to='/login'  state={"/temp-access"}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;