import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Login';
import HomePage from './HomePage';
import Layout from './Layout';
import Form from './Form';

const App = () => {
  const username = 'TestUser'; // Update this based on your authentication system

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={
          <Layout username={username}>
            <HomePage />
          </Layout>
        } />
        <Route path="/form" element={
          <Layout username={username}>
            <Form />
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default App;
