import { Paper, Typography, IconButton } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Poll({ poll, isAdmin }) {
  Poll.propTypes = {
    poll: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
  };
  return (
    <Paper style={{ padding: '16px', backgroundColor: '#f5f5f5', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Typography variant="h5">{poll.title}</Typography>
        <Typography variant="body1">{poll.description}</Typography>
      </div>
      {isAdmin && (
        <IconButton component={Link} to={`/pollresults/${poll.title}`}>
          <BarChartIcon />
        </IconButton>
      )}
    </Paper>
  );
};
