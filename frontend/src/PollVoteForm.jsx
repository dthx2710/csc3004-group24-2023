import React from 'react';
import { Container, Box, Typography, Radio, RadioGroup, FormControlLabel, Stack, Button } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';

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

export default function PollVoteForm() {
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div style={{backgroundColor: 'white'}}>
            <Container maxWidth="md">
                <Box sx={{ mt: 4, mb: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom style={{ color: 'black'}} align="center" fontWeight={600}>
                        Ang Mo Kio GRC - GE2020
                    </Typography>

                    <Typography component="h1" gutterBottom style={{ color: 'black'}} align="center" fontSize={18}>
                        Description and Guidelines will be written here for the voter's reference.
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
                            <FormControlLabel 
                                value="PAP"
                                control={<Radio sx={{ color: '#f44336', "&.Mui-checked": { color: '#f44336' } }} />}
                                label="(PAP) People's Action Party - John Lim, Thomas Tan"
                                sx={{ color: 'black' }}
                            />

                            <FormControlLabel 
                                value="WP"
                                control={<Radio sx={{ color: '#f44336', "&.Mui-checked": { color: '#f44336' } }} />}
                                label="(WP) Worker's Party - Mary Tan, Tom Lee"
                                sx={{ color: 'black' }}
                            />
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