import React from 'react';
import { Grid, Tooltip } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import Poll from './Poll';

export default function PollList({ polls }) {
  return (
    <Grid container spacing={2}>
      {polls.map((poll, index) => (
        <Grid item xs={12} key={index}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {poll.isCompulsory && (
              <Tooltip title="Compulsory poll" arrow>
                <WarningIcon color="error" style={{ marginRight: '5px' }} />
              </Tooltip>
            )}
            <Poll poll={poll} />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};
