import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  styled,
} from "@mui/material";
import axios from "axios";

// Create a custom LinearProgress component with red color
const RedLinearProgress = styled(LinearProgress)(({ theme }) => ({
  backgroundColor: "#ffb3b3",
  "& .MuiLinearProgress-barColorPrimary": {
    backgroundColor: "#f44336",
  },
}));

const PollResults = () => {
  const HeaderTypography = styled(Typography)({
    fontFamily: "Century Gothic",
    fontWeight: "bold",
  });

  const TitleTypography = styled(Typography)({
    fontFamily: "Century Gothic",
  });

  const { title } = useParams();
  const location = useLocation();
  const state = location.state;
  const pollId = state.data.pollId;

  const [results, setResults] = useState([]);
  const [progresses, setProgresses] = useState([]);

  useEffect(() => {
    const pollResult = () => {
      axios
        .get(`/api/result/${pollId}`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}` },
        })
        .then((response) => {
          const { resultInfo } = response.data;
          const { voteTally, optionNames } = resultInfo;
          let results = [];
          let totalVotes = 0;
          for (let i = 0; i < voteTally.length; i++) {
            // Convert voteTally[i] to an integer
            const vote = parseInt(voteTally[i], 10);
            // Calculate total number of votes
            totalVotes += vote;
            results.push({
              name: optionNames[i],
              votes: vote,
            });
          }

          results = results.map((result) => {
            // if zero round to zero
            const dividedVotes = totalVotes === 0 ? 0 : result.votes / totalVotes;
            return {
              ...result,
              percentage: ((dividedVotes) * 100).toFixed(0),
            };
          });

          // set result only when there is a change
          setResults((prevResult) => {
            if (JSON.stringify(prevResult) !== JSON.stringify(results)) {
              // Initialize progress for each result
              const initialProgresses = results.map(() => 0);
              setProgresses(initialProgresses);
              return results;
            }
            return prevResult;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    pollResult();
    // Get the poll results from the server every 5 seconds
    const interval = setInterval(() => {
      pollResult();
    }, 5000);
    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [pollId]);

  useEffect(() => {
    const timers = progresses.map((progress, index) => {
      if (progress < Number(results[index]?.percentage)) {
        return setTimeout(() => {
          setProgresses((prev) => {
            const copy = [...prev];
            copy[index]++;
            return copy;
          });
        }, 10);
      }
    });

    return () => timers.forEach(clearTimeout); // Cleanup timers on unmount or when progresses changes
  }, [progresses, results]);

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Paper elevation={3} sx={{ padding: "20px" }}>
          <HeaderTypography variant="h4" component="h1" align="center">
            Poll Results for {title}
          </HeaderTypography>
          <Grid
            container
            spacing={2}
            sx={{ marginTop: "10px", marginBottom: "10px" }}
          >
            {results.map((result, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ mt: 1, p: 1, backgroundColor: "grey.100" }}>
                  <CardContent>
                    <TitleTypography variant="h6" gutterBottom>
                      {result.name}
                    </TitleTypography>
                    <TitleTypography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {result.votes} votes
                    </TitleTypography>
                    <RedLinearProgress
                      variant="determinate"
                      value={progresses[index] || 0}
                      sx={{ mt: 1, height: "10px", borderRadius: "5px" }}
                    />
                    <TitleTypography variant="h6" align="right">
                      {result.percentage || 0}%
                    </TitleTypography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default PollResults;
