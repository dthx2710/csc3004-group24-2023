import React from 'react';
import { Container, Box, Typography, Radio, RadioGroup, FormControlLabel, Stack, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const commonStyles = {
    bgcolor: '#f2f2f2',
    m: 1,
    borderTop: 6,
    borderRadius: '20px',
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 5,
    paddingBottom: 5
};


// const options = [
//     {option_id: 1, option_name: "People's Action Party", poll_id: 1},
//     {option_id: 2, option_name: "Workers' Party", poll_id: 1},
//     {option_id: 3, option_name: "Progress Singapore Party", poll_id: 1},
// ]

export default function PollVoteForm() {
    const [value, setValue] = React.useState('female');
    const { title, description } = useParams();
    const [options, setOptions] = React.useState([]);
    
    const location = useLocation();
    const state = location.state;
    const pollId = state.data.pollId;

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    React.useEffect(() => {
        axios.get(`http://localhost:8080/polls/${pollId}`)
        .then(response => {
            for(let i = 0; i < response.data.options.length; i++){
                options.push({option_id: response.data.optionsId[i], option_name: response.data.options[i]})
                setOptions([...options]);
            }
        })
        .catch((error) => {
          console.log(error);
        })
      }, []);

    return (
        <div style={{backgroundColor: 'white'}}>
            <Container maxWidth="md">
                <Box sx={{ mt: 4, mb: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom style={{ color: 'black'}} align="center" fontWeight={600}>
                        {title}
                    </Typography>

                    <Typography component="h1" gutterBottom style={{ color: 'black'}} align="center" fontSize={18}>
                        {description}
                    </Typography>

                    <Box sx={{ ...commonStyles, borderColor: '#f44336'}}>
                        <Typography variant="h6" component="h2" gutterBottom style={{ color: 'black'}}>
                            Select your choice:
                        </Typography>

                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            {options.map((option) => (
                                <FormControlLabel
                                key={option.option_id}
                                value={option.option_name}
                                control={<Radio sx={{ color: '#f44336', "&.Mui-checked": { color: '#f44336' } }} />}
                                label={option.option_name}
                                sx={{ color: 'black' }}
                                />
                            ))}
                        </RadioGroup>

                        <Stack direction="row" marginTop={10}>
                            <Button 
                                color="secondary"
                                sx={{ '&:hover': { backgroundColor: '#aa2e25' }}}
                                variant="contained" 
                                startIcon={<HowToRegIcon />}>
                                Vote
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};