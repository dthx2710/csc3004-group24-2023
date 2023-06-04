import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginPage from './Login';
import UserHomePage from './UserHomePage';
import AdminHomePage from './AdminHomePage';
import Layout from './Layout';
import PollForm from './PollForm';
import PollVoteForm from './PollVoteForm';
import PollResults from './PollResults';

const App = () => {
  //const username = 'TestUser'; // Update this based on your authentication system
  const [user, setUser] = useState(null);
  const [sessionPassword, setSessionPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [constituency, setconstituency] = useState(null);

  const handleLogin = (user, user_constituency) => {
    setUsername(user);
    setconstituency(user_constituency);
  };

  return (
    <Router>
      <AnimatePresence wait>
        <Routes>
          <Route path="/" element={<LoginPage user={user} setUser={setUser} setSessionPassword={setSessionPassword} onLogin={handleLogin} />} />
          <Route path="/userhome" element={
            <Layout username={username}><UserHomePage constituency={constituency}/></Layout>
          } />
          <Route path="/adminhome" element={
            <Layout username={username}><AdminHomePage constituency={constituency} /></Layout>
          } />
          <Route path="/pollform" element={
            <Layout username={username} ><PollForm constituency={constituency} /></Layout>
          } />
          <Route path="/pollvoteform/:title/:description" element={
            <Layout username={username} ><PollVoteForm constituency={constituency} /></Layout>
          } />
          <Route path="/pollresults/:title" element={
            <Layout username={username} ><PollResults constituency={constituency} /></Layout>
          } />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default App;
