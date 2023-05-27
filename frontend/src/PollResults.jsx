import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const PollResults = () => {
  const { title } = useParams();

  // Here, results would ideally come from your server
  const [results, setResults] = useState([
    {name: 'Party 1', votes: 22340},
    {name: 'Party 2', votes: 3532},
  ]);

  useEffect(() => {
    // To fetch poll results from server here and call setResults
  }, [title]);

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h4" component="h1" align="center">
            Poll Results for {title}
          </Typography>
          <Box mt={3} display="flex" justifyContent="center">
            <BarChart width={600} height={300} data={results}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="votes" fill="#8884d8" />
            </BarChart>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default PollResults;
