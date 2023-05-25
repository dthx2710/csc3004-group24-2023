import React from 'react';
import { Box, Container, Typography, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const commonStyles = {
    bgcolor: '#f2f2f2',
    m: 1,
    borderTop: 5,
    height: '100vh',
    borderRadius: '20px',
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 5,
    paddingBottom: 5
  };

export default function Form() {
    const [electoralDivision, setElectoralDivision] = React.useState('');
    const [constituency, setConstituency] = React.useState('');

    const handleElectoralDivisionChange = (event) => {
        setElectoralDivision(event.target.value);
        setConstituency(''); // reset constituency when electoral division changes
    };

    const handleConstituencyChange = (event) => {
        setConstituency(event.target.value);
    };

    const getConstituencyOptions = () => {
        switch (electoralDivision) {
            case 'GRC':
                return [
                    <MenuItem key={'ALJ-GRC'} value={'ALJ-GRC'}>Aljunied GRC</MenuItem>,
                    <MenuItem key={'AMK-GRC'} value={'AMK-GRC'}>Ang Mo Kio GRC</MenuItem>,
                    <MenuItem key={'BTP-GRC'} value={'BTP-GRC'}>Bishan-Toa Payoh GRC</MenuItem>,
                    <MenuItem key={'CCK-GRC'} value={'CCK-GRC'}>Chua Chu Kang GRC</MenuItem>,
                    <MenuItem key={'EAS-GRC'} value={'EAS-GRC'}>East Coast GRC</MenuItem>,
                    <MenuItem key={'HBT-GRC'} value={'HBT-GRC'}>Holland-Bukit Timah GRC</MenuItem>,
                    <MenuItem key={'JAL-GRC'} value={'JAL-GRC'}>Jalan Besar GRC</MenuItem>,
                    <MenuItem key={'JUR-GRC'} value={'JUR-GRC'}>Jurong GRC</MenuItem>,
                    <MenuItem key={'MAP-GRC'} value={'MAP-GRC'}>Marine Parade GRC</MenuItem>,
                    <MenuItem key={'MYT-GRC'} value={'MYT-GRC'}>Marsiling-Yew Tee GRC</MenuItem>,
                    <MenuItem key={'NEE-GRC'} value={'NEE-GRC'}>Nee Soon GRC</MenuItem>,
                    <MenuItem key={'PRP-GRC'} value={'PRP-GRC'}>Pasir Ris-Punggol GRC</MenuItem>,
                    <MenuItem key={'SEM-GRC'} value={'SEM-GRC'}>Sembawang GRC</MenuItem>,
                    <MenuItem key={'SEN-GRC'} value={'SEN-GRC'}>Sengkang GRC</MenuItem>,
                    <MenuItem key={'TAM-GRC'} value={'TAM-GRC'}>Tampines GRC</MenuItem>,
                    <MenuItem key={'TAN-GRC'} value={'TAN-GRC'}>Tanjong Pagar GRC</MenuItem>,
                    <MenuItem key={'WES-GRC'} value={'WES-GRC'}>West Coast GRC</MenuItem>
                ];
            case 'SMC':
                return [
                    <MenuItem key={'BKB-SMC'} value={'BKB-SMC'}>Bukit Batok SMC</MenuItem>,
                    <MenuItem key={'BKP-SMC'} value={'BKP-SMC'}>Bukit Panjang SMC</MenuItem>,
                    <MenuItem key={'HKN-SMC'} value={'HKN-SMC'}>Hong Kah North SMC</MenuItem>,
                    <MenuItem key={'HOU-SMC'} value={'HOU-SMC'}>Hougang SMC</MenuItem>,
                    <MenuItem key={'KEB-SMC'} value={'KEB-SMC'}>Kebun Baru SMC</MenuItem>,
                    <MenuItem key={'MAC-SMC'} value={'MAC-SMC'}>MacPherson SMC</MenuItem>,
                    <MenuItem key={'MAR-SMC'} value={'MAR-SMC'}>Marymount SMC</MenuItem>,
                    <MenuItem key={'MOU-SMC'} value={'MOU-SMC'}>Mountbatten SMC</MenuItem>,
                    <MenuItem key={'PIO-SMC'} value={'PIO-SMC'}>Pioneer SMC</MenuItem>,
                    <MenuItem key={'POT-SMC'} value={'POT-SMC'}>Potong Pasir SMC</MenuItem>,
                    <MenuItem key={'PUN-SMC'} value={'PUN-SMC'}>Punggol West SMC</MenuItem>,
                    <MenuItem key={'RAD-SMC'} value={'RAD-SMC'}>Radin Mas SMC</MenuItem>,
                    <MenuItem key={'YCK-SMC'} value={'YCK-SMC'}>Yio Chu Kang SMC</MenuItem>,
                    <MenuItem key={'YUH-SMC'} value={'YUH-SMC'}>Yuhua SMC</MenuItem>
                ];
            default:
                return [];
        }
    };

    return (
        <div style={{backgroundColor: 'white'}}>
            <Container maxWidth="md">
                <Box sx={{ mt: 4, mb: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom style={{ color: 'black'}} align="center" fontWeight={600}>
                        Create A Poll
                    </Typography>

                    <Typography component="h1" gutterBottom style={{ color: 'black'}} align="center" fontSize={18}>
                        Complete the below fields to create your poll.
                    </Typography>

                    <Box sx={{ ...commonStyles, borderColor: '#f44336'}}>
                        <Typography variant="h6" component="h2" gutterBottom style={{ color: 'black'}}>
                            Title
                        </Typography>

                        <TextField
                            required
                            id="filled-required"
                            label="Enter form title here"
                            variant="filled"
                            fullWidth
                        />

                        <Typography variant="h6" component="h2" gutterBottom style={{ color: 'black'}} marginTop={3}>
                            Electoral Division
                        </Typography>

                        <FormControl variant="filled" sx={{ minWidth: 380 }}>
                            <InputLabel id="electoral-division-label">Select Electoral Division</InputLabel>
                            <Select
                                labelId="electoral-division-label"
                                id="electoral-division-select"
                                value={electoralDivision}
                                onChange={handleElectoralDivisionChange}
                            >
                                <MenuItem value={'GRC'}>Group Representation Constituencies (GRC)</MenuItem>
                                <MenuItem value={'SMC'}>Single Member Constituencies (SMC)</MenuItem>
                            </Select>
                        </FormControl>

                        <Typography variant="h6" component="h2" gutterBottom style={{ color: 'black'}} marginTop={3}>
                            Constituency
                        </Typography>

                        <FormControl key={electoralDivision} variant="filled" sx={{ minWidth: 350 }}>
                            <InputLabel id="constituency-label">Select Constituency</InputLabel>
                            <Select
                                labelId="constituency-label"
                                id="constituency-select"
                                value={constituency}
                                onChange={handleConstituencyChange}
                            >
                                {getConstituencyOptions()}
                            </Select>
                        </FormControl>

                    </Box>
                </Box>
            </Container>
        </div>
    );
};