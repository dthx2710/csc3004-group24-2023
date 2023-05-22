import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Login';
import HomePage from './HomePage';
import Layout from './Layout';

const App = () => {
  const username = 'User'; // Update this based on your authentication system

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={
          <Layout username={username}>
            <HomePage />
            {/* other routes */}
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default App;
