import { styled } from '@mui/system';
import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useLocation } from "react-router-dom";
import axios from "axios";

const commonStyles = {
  bgcolor: "#f2f2f2",
  m: 1,
  borderTop: 6,
  borderRadius: "20px",
  paddingLeft: 7,
  paddingRight: 7,
  paddingTop: 5,
  paddingBottom: 5,
};

// const options = [
//     {option_id: 1, option_name: "People's Action Party", poll_id: 1},
//     {option_id: 2, option_name: "Workers' Party", poll_id: 1},
//     {option_id: 3, option_name: "Progress Singapore Party", poll_id: 1},
// ]

export default function PollVoteForm() {
  const HeaderTypography = styled(Typography)({
    fontFamily: 'Century Gothic',
    fontWeight: 'bold'
  });

  const TitleTypography = styled(Typography)({
    fontFamily: 'Century Gothic'
  });

  const [values, setValues] = useState({ main: { id: "", name: "" } });
  const { title, description } = useParams();
  const [options, setOptions] = useState([]);

  const location = useLocation();
  const state = location.state;
  const pollId = state.data.pollId;

  const vote = () => {
    // check if user has voted on poll before
    if (sessionStorage.getItem("sessionVoted") !== null) {
      const sessionVoted = JSON.parse(sessionStorage.getItem("sessionVoted"));
      if (sessionVoted.includes(pollId)) {
        alert("You have already voted on this poll!");
        return;
      }
    }
    // check if user has selected an option
    if (values.main.id === "") {
      alert("Please select an option!");
      return;
    }
    // post vote to backend
    const voteInfo = {
      poll_id: pollId,
      option_id: values.main.id,
    };
    axios
      .post(
        `/api/vote`,
        {
          vote_info: voteInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
        }
      )
      .then((response) => {
        console.log(
          "Success:",
          response.data.success,
          " Message:",
          response.data.message
        );
        if (response.data.success) {
          // create sessionStorage entry for voted on poll if exists
          if (sessionStorage.getItem("sessionVoted") === null) {
            sessionStorage.setItem("sessionVoted", JSON.stringify([]));
          }
          const sessionVoted = JSON.parse(
            sessionStorage.getItem("sessionVoted")
          );
          // add pollId to sessionVoted array
          sessionVoted.push(pollId);
          sessionStorage.setItem("sessionVoted", JSON.stringify(sessionVoted));
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (prop) => (event) => {
    const optionName = event.target.value;
    // find option id from options array
    const optionId = options.find(
      (option) => option.option_name === optionName
    ).option_id;

    setValues({
      ...values,
      [prop]: { id: optionId, name: optionName },
    });
  };

  useEffect(() => {
    axios
      .get(`/api/polls/${pollId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        for (let i = 0; i < response.data.options.length; i++) {
          // if option not already in options array
          if (
            !options.some(
              (option) => option.option_id === response.data.optionsId[i]
            )
          ) {
            options.push({
              option_id: response.data.optionsId[i],
              option_name: response.data.options[i],
            });
          }
        }
        setOptions([...options]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ backgroundColor: "white" }}>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 2 }}>
          <HeaderTypography
            variant="h4"
            component="h1"
            gutterBottom
            style={{ color: "black" }}
            align="center"
            fontWeight={600}
          >
            {title}
          </HeaderTypography>

          <TitleTypography
            component="h1"
            gutterBottom
            style={{ color: "black" }}
            align="center"
            fontSize={18}
          >
            {description}
          </TitleTypography>

          <Box sx={{ ...commonStyles, borderColor: "#f44336" }}>
            <TitleTypography
              variant="h6"
              component="h2"
              gutterBottom
              style={{ color: "black" }}
            >
              Select your choice:
            </TitleTypography>

            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={values.main.name}
              onChange={handleChange("main")}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.option_id}
                  value={option.option_name}
                  control={
                    <Radio
                      sx={{
                        color: "#f44336",
                        "&.Mui-checked": { color: "#f44336" },
                      }}
                    />
                  }
                  label={
                    <TitleTypography
                      sx={{
                        fontFamily: 'Century Gothic',
                        fontSize: '1.1rem'
                      }}
                    >
                      {option.option_name}
                    </TitleTypography>
                  }
                  sx={{ color: "black" }}
                />
              ))}
            </RadioGroup>

            <Stack direction="row" marginTop={10}>
              <Button
                onClick={vote}
                color="secondary"
                sx={{ "&:hover": { backgroundColor: "#aa2e25" } }}
                variant="contained"
                startIcon={<HowToRegIcon />}
              >
                Vote
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
