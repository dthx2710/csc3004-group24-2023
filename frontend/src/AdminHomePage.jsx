import React from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PollList from './PollList';

export default function HomePage() {
  const navigate = useNavigate();

  const polls = [
    { title: 'Poll 1', description: 'Description for poll 1', isCompulsory: false },
    { title: 'Poll 2', description: 'Description for poll 2', isCompulsory: true },
    // other polls...
  ];

  return (
    <div style={{backgroundColor: 'white'}}>
        <Container maxWidth="md">
          <Box sx={{ mt: 4, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" component="h1" gutterBottom style={{ color: 'black'}}>
                Created Polls
              </Typography>
              <Button 
                  color="secondary"
                  sx={{ '&:hover': { backgroundColor: '#aa2e25' }}}
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/form")}>
                  Add Poll Form
              </Button>
            </Box>
            <PollList polls={polls} />
          </Box>
        </Container>
    </div>
  );
};