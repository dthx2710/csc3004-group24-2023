import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, ButtonGroup } from '@mui/material';
import { motion } from 'framer-motion';
import PollList from './PollList';
import axios from 'axios';


export default function UserHomePage({ constituency, handlePollClick }) {
  const [pollStatus, setPollStatus] = useState('ongoing');

  const [polls, setPolls] = useState([]);
  
  useEffect(() => {
    if(constituency){
      axios.get('http://localhost:8080/polls')
      .then(response => {
        for (let i = 0; i < response.data.pollItem.length; i++) {
          if(constituency === response.data.pollItem[i].pollInfo.constituencyId){
            polls.push({title: response.data.pollItem[i].pollInfo.pollTitle, description: response.data.pollItem[i].pollInfo.pollDescription, isCompulsory: JSON.parse(response.data.pollItem[i].pollInfo.isCompulsory), status: response.data.pollItem[i].pollInfo.status, endTime: response.data.pollItem[i].pollInfo.pollEndtime, pollId: response.data.pollItem[i].pollId});
            setPolls([...polls]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, []);
        
  const sortedPolls = [...polls].sort((a, b) => {
    return new Date(a.endTime) - new Date(b.endTime);
  });

  // const polls = [
  //   { title: 'Ang Mo Kio GRC - GE2020', description: 'Description for poll 1', isCompulsory: false, status: 'ongoing' },
  //   { title: 'Jurong GRC - GE2020', description: 'Description for poll 1', isCompulsory: true, status: 'ongoing' },
  //   { title: 'Marsiling-Yew Tee GRC - GE2020', description: 'Description for poll 1', isCompulsory: false, status: 'ongoing' },
  //   { title: 'Bukit Panjang SMC - GE2020', description: 'Description for poll 2', isCompulsory: true, status: 'ended' },
  //   // other polls...
  // ];

  const filteredPolls = sortedPolls.filter(poll => poll.status === pollStatus);

  const selectedButtonStyle = { backgroundColor: '#df0023', color: 'white' };
  const unselectedButtonStyle = { backgroundColor: '#59515E' };

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
    style={{backgroundColor: 'white'}}
  >
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
            <PollList polls={filteredPolls} isAdmin={false} handlePollClick={handlePollClick}/>
          </Box>
        </Container>
    </motion.div>
  );
};
