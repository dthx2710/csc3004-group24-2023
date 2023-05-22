import React from 'react';
import { Paper, Typography } from '@mui/material';


export default function Poll({ poll }) {
  return (
    <Paper style={{ padding: '16px', backgroundColor: '#f5f5f5', width: '100%' }}>
      <Typography variant="h5">{poll.title}</Typography>
      <Typography variant="body1">{poll.description}</Typography>
    </Paper>
  );
};
