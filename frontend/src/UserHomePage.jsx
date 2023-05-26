import React, { useState } from 'react';
import { Box, Container, Typography, Button, ButtonGroup } from '@mui/material';
import PollList from './PollList';

export default function UserHomePage() {
  const [pollStatus, setPollStatus] = useState('ongoing');

  const polls = [
    { title: 'Ang Mo Kio GRC - GE2020', description: 'Description for poll 1', isCompulsory: false, status: 'ongoing' },
    { title: 'Poll 2', description: 'Description for poll 2', isCompulsory: true, status: 'ended' },
    // other polls...
  ];

  const filteredPolls = polls.filter(poll => poll.status === pollStatus);

  const selectedButtonStyle = { backgroundColor: '#df0023', color: 'white' };
  const unselectedButtonStyle = { backgroundColor: '#59515E' };

  return (
    <div style={{backgroundColor: 'white'}}>
        <Container maxWidth="md">
          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom style={{ color: 'black'}}>
              {pollStatus.charAt(0).toUpperCase() + pollStatus.slice(1)} Polls
            </Typography>
            <Box sx={{ my: 2 }}>
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button style={pollStatus === 'ongoing' ? selectedButtonStyle : unselectedButtonStyle} onClick={() => setPollStatus('ongoing')}>Ongoing</Button>
                <Button style={pollStatus === 'ended' ? selectedButtonStyle : unselectedButtonStyle} onClick={() => setPollStatus('ended')}>Ended</Button>
              </ButtonGroup>
            </Box>
            <PollList polls={filteredPolls} />
          </Box>
        </Container>
    </div>
  );
};
