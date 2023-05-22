import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PollList from './PollList';

export default function HomePage() {
  const polls = [
    { title: 'Poll 1', description: 'Description for poll 1' },
    { title: 'Poll 2', description: 'Description for poll 2' },
    { title: 'Poll 2', description: 'Description for poll 2' },
    { title: 'Poll 2', description: 'Description for poll 2' },
    { title: 'Poll 2', description: 'Description for poll 2' },
    { title: 'Poll 2', description: 'Description for poll 2' },
    { title: 'Poll 2', description: 'Description for poll 2' },
    // other polls...
  ];

  return (
    <div style={{backgroundColor: 'white'}}>
        <Container maxWidth="md">
          <Box sx={{ mt: 4, mb: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom style={{ color: 'black'}}>
              Available Polls
              </Typography>
              <PollList polls={polls} />
          </Box>
        </Container>
    </div>
  );
};