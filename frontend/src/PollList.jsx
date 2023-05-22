import React from 'react';
import { Grid } from '@mui/material';
import Poll from './Poll';

export default function PollList({ polls }) {
  return (
    <Grid container spacing={2}>
      {polls.map((poll, index) => (
        <Grid item xs={12} key={index}>
          <Poll poll={poll} />
        </Grid>
      ))}
    </Grid>
  );
};
