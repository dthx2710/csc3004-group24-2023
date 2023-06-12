import { Paper, Typography, IconButton } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Poll({ poll, isAdmin, deletePoll }) {
  Poll.propTypes = {
    poll: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    deletePoll: PropTypes.func.isRequired,
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm("Do you really want to delete this poll?")) {
      deletePoll(poll.pollId);
    }
  };

  return (
    <Paper style={{ padding: '16px', backgroundColor: '#f5f5f5', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link to={`/pollvoteform/${poll.title}/${poll.description}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h5">{poll.title}</Typography>
          <Typography variant="body1">{poll.description}</Typography>
        </Link>
      </div>
      {isAdmin && (
        <div>
          <IconButton component={Link} to={`/pollresults/${poll.title}`}>
            <BarChartIcon />
          </IconButton>
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </Paper>
  );
}

export default Poll;
