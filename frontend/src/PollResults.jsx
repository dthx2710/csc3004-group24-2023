import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Paper, Grid, Card, CardContent, LinearProgress, styled } from '@mui/material';

// Create a custom LinearProgress component with red color
const RedLinearProgress = styled(LinearProgress)(({ theme }) => ({
  backgroundColor: '#ffb3b3',
  '& .MuiLinearProgress-barColorPrimary': {
    backgroundColor: '#f44336',
  },
}));

const PollResults = () => {
  const { title } = useParams();

  // Here, results would ideally come from your server
  const [results, setResults] = useState([
    {name: `(PAP) People's Action Party - John Lim, Thomas Tan`, votes: 22340},
    {name: `(WP) Worker's Party - Mary Tan, Tom Lee`, votes: 3532},
  ]);

  // Initialize progress array with zeros
  const [progress, setProgress] = useState(results.map(() => 0));

  // Calculate the total votes
  const totalVotes = results.reduce((sum, result) => sum + result.votes, 0);

  useEffect(() => {
    // Create a timer that increments the progress
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = [...oldProgress];
        for (let i = 0; i < results.length; i++) {
          const votePercentage = (results[i].votes / totalVotes * 100).toFixed(2);
          if (newProgress[i] < votePercentage) {
            newProgress[i] += 1;
          }
        }
        return newProgress;
      });
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [results, totalVotes]);

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Typography variant="h4" component="h1" align="center">
            Poll Results for {title}
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: '10px', marginBottom: '10px' }}>
            {results.map((result, index) => {
              const votePercentage = (result.votes / totalVotes * 100).toFixed(0);
              return (
                <Grid item xs={12} key={index}>
                  <Card sx={{ mt: 1, p: 1, backgroundColor: 'grey.100' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {result.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        {result.votes} votes
                      </Typography>
                      <RedLinearProgress variant="determinate" value={progress[index] || 0} sx={{ mt: 1, height: '10px', borderRadius: '5px' }} />
                      <Typography variant="h6" align="right">
                        {votePercentage}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default PollResults;
