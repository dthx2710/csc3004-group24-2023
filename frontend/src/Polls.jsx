import React, { useEffect, useState } from 'react';
import Poll from './Poll';

function Polls({ isAdmin }) {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    const res = await axios.get("/api/polls");
    setPolls(res.data);
  };

  const deletePoll = async (pollId) => {
    await axios.delete(`/api/polls/${pollId}`);
    fetchPolls(); // Refresh polls
  };

  return (
    <div>
      {polls.map(poll => (
        <Poll key={poll.pollId} poll={poll} isAdmin={isAdmin} deletePoll={deletePoll} />
      ))}
    </div>
  );
}

export default Polls;
