import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button, ButtonGroup, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PollList from './PollList';

export default function AdminHomePage() {
  const navigate = useNavigate();
  const [pollStatus, setPollStatus] = useState('ongoing');

  const polls = [
    { title: 'Ang Mo Kio GRC - GE2020', description: 'Description for poll 1', isCompulsory: false, status: 'ongoing' },
    { title: 'Jurong GRC - GE2020', description: 'Description for poll 1', isCompulsory: true, status: 'ongoing' },
    { title: 'Marsiling-Yew Tee GRC - GE2020', description: 'Description for poll 1', isCompulsory: false, status: 'ongoing' },
    { title: 'Bukit Panjang SMC - GE2020', description: 'Description for poll 2', isCompulsory: true, status: 'ended' },
    // other polls...
  ];

  const filteredPolls = polls.filter(poll => poll.status === pollStatus);

  const selectedButtonStyle = { backgroundColor: '#df0023', color: 'white' };
  const unselectedButtonStyle = { backgroundColor: '#59515E' };

  return (
    <Box sx={{backgroundColor: 'white'}}>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 2 }}>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" component="h1" gutterBottom style={{ color: 'black'}}>
                {pollStatus.charAt(0).toUpperCase() + pollStatus.slice(1)} Polls
              </Typography>
            </Grid>
            <Grid item>
              <Button 
                  color="secondary"
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/pollform")}>
                  Add Poll Form
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ my: 2 }}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button style={pollStatus === 'ongoing' ? selectedButtonStyle : unselectedButtonStyle} onClick={() => setPollStatus('ongoing')}>Ongoing</Button>
              <Button style={pollStatus === 'ended' ? selectedButtonStyle : unselectedButtonStyle} onClick={() => setPollStatus('ended')}>Ended</Button>
            </ButtonGroup>
          </Box>
          <PollList polls={filteredPolls} isAdmin={true} />
        </Box>
      </Container>
    </Box>
  );
};
