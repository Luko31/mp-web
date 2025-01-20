import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './comps/LoginForm';
import Dashboard from './comps/Dashboard'; // Assuming you have a Dashboard component
import GateControlApp from './comps/test';
import LoginPage from './comps/test-login';
import TempAccessForm from './comps/temp_access';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/gate" element={<GateControlApp />} />
          <Route path="/login2" element={<LoginPage />} />
          <Route path="/temp-access" element={<TempAccessForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;