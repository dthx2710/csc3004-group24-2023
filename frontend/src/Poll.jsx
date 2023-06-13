import { Paper, Typography, IconButton } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

export default function Poll({ poll, isAdmin, state }) {
  Poll.propTypes = {
    poll: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    state: PropTypes.object,
  };

  const { data } = state;
  const { pollId } = data;

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm("Do you really want to delete this poll?")) {
      deletePoll();
    }
  };

  async function deletePoll() {
    axios
      .delete(`/api/polls/${pollId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Success!", response);
          alert("Poll deleted successfully!");
          window.location.reload();
          console.log("Poll deleted");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    console.log("Button clicked!");
  }

  return (
    <Paper
      style={{
        padding: "16px",
        backgroundColor: "#f5f5f5",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Link
          to={`/pollvoteform/${poll.title}/${poll.description}`}
          style={{ textDecoration: "none", color: "inherit" }}
          state={{ data: { pollId: poll.pollId } }}
        >
          <Typography variant="h5">{poll.title}</Typography>
          <Typography variant="body1">{poll.description}</Typography>
        </Link>
      </div>
      {isAdmin && (
        <div>
          <IconButton
            component={Link}
            to={`/pollresults/${poll.title}`}
            state={{ data: { pollId: poll.pollId } }}
          >
            <BarChartIcon />
          </IconButton>
          <IconButton onClick={handleDeleteClick} type="button">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </Paper>
  );
}
