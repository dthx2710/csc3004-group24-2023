import React from 'react';
import { Grid, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import WarningIcon from '@mui/icons-material/Warning';
import Poll from './Poll';

export default function PollList({ polls }) {
  return (
    <Grid container spacing={2}>
      {polls.map((poll, index) => (
        <Grid item xs={12} key={index}>
          <Link to={`/pollvoteform/${poll.title}/${poll.description}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {poll.isCompulsory && (
                <Tooltip title="Compulsory poll" arrow>
                  <WarningIcon color="error" style={{ marginRight: '10px' }} />
                </Tooltip>
              )}
              <Poll poll={poll} />
            </div>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
