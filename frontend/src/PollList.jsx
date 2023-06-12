import { Grid, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import WarningIcon from '@mui/icons-material/Warning';
import Poll from './Poll';
import PropTypes from 'prop-types';

export default function PollList({ polls, isAdmin }) {
  PollList.propTypes = {
    polls: PropTypes.array.isRequired,
    isAdmin: PropTypes.bool.isRequired,
  };
  return (
    <Grid container spacing={2}>
      {polls.map((poll, index) => (
        <Grid item xs={12} key={index}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {poll.isCompulsory && (
              <Tooltip title="Compulsory poll" arrow>
                <WarningIcon color="error" style={{ marginRight: '10px' }} />
              </Tooltip>
            )}
            
            <Poll poll={poll} isAdmin={isAdmin} state={{ data: { pollId: poll.pollId }}} />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};
