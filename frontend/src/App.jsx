import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Login';
import UserHomePage from './UserHomePage';
import AdminHomePage from './AdminHomePage';
import Layout from './Layout';
import PollForm from './PollForm';
import PollVoteForm from './PollVoteForm';

const App = () => {
  //const username = 'TestUser'; // Update this based on your authentication system

  const [username, setUsername] = useState(null);

  const handleLogin = (user) => {
    setUsername(user);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <LoginPage onLogin={handleLogin} />
        } />
        <Route path="/userhome" element={
          <Layout username={username}>
            <UserHomePage />
          </Layout>
        } />
        <Route path="/adminhome" element={
          <Layout username={username}>
            <AdminHomePage />
          </Layout>
        } />
        <Route path="/pollform" element={
          <Layout username={username}>
            <PollForm />
          </Layout>
        } />
        <Route path="/pollvoteform" element={
          <Layout username={username}>
            <PollVoteForm />
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default App;
