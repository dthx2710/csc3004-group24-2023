import React from 'react';
import { Box, Container, Typography, TextField, FormControl, InputLabel, MenuItem, Select, Button, Stack, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import axios from "axios";

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

export default function PollForm() {
    const [title, setTitle] = React.useState(''); 
    const [description, setDescription] = React.useState('');  
    const [eventType, setEventType] = React.useState('');
    const [electoralDivision, setElectoralDivision] = React.useState('');
    const [constituency, setConstituency] = React.useState('');
    const [isCompulsory, setCompulsory] = React.useState('');
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');
    const [items, setItems] = React.useState(['', '']);

    React.useEffect(() => {
        setCompulsory(true);
    } , []);

    const formatDate = (date) => {
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        };
      
        const formattedDate = date.toLocaleDateString('en-GB', options);
        const formattedTime = date.toLocaleTimeString('en-US', { hour12: false });
      
        return `${formattedDate} ${formattedTime}`;
      };

    const handleTitleChange = (event) => {  // add a function to handle the title change
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {  // add a function to handle the description change
        setDescription(event.target.value);
    };

    const handleEventTypeChange = (event) => {
        setEventType(event.target.value);
    };

    const handleStartTimeChange = (event) => {
        setStartTime(formatDate(event.$d));
    };

    const handleEndTimeChange = (event) => {
        setEndTime(formatDate(event.$d));
    };

    const handleCompulsoryTypeChange = (event) => {
        setCompulsory(event.target.checked);
    };

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

    const handleItemChange = (event, index) => {
        const newItems = [...items];
        newItems[index] = event.target.value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, '']);
    };

    const removeItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    function handleCreateClick() {
        console.log("\nevent type: " + eventType);
        console.log("electoral division: " + electoralDivision);
        console.log("constituency: " + constituency);
        console.log("title: " + title);
        console.log("description: " + description);
        console.log("items: " + items);
        console.log("is compulsory: " + isCompulsory);
        console.log("poll start time: " + startTime);
        console.log("poll end time: " + endTime);
        if(eventType === 'GE') {
            const pollInfo = {
                poll_starttime: startTime.toString(),
                poll_endtime: endTime.toString(),
                status: "ongoing",
                constituency_id: constituency,
                poll_title: title,
                poll_description: description,
                is_compulsory: isCompulsory.toString(),
            };
            const postItem = {
                poll_info: pollInfo,
                options: items,
              };
              axios
              .post("/api/polls", postItem)
              .then((response) => {
                  if (response.status === 200) {
                      console.log(response);
                  }
                  })
                  .catch((error) => {
                  console.log(error);
                  }); 
        }
        else{
            const pollInfo = {
                poll_starttime: startTime.toString(),
                poll_endtime: endTime.toString(),
                status: "ongoing",
                constituency_id: constituency,
                poll_title: title,
                poll_description: description,
                is_compulsory: isCompulsory.toString(),
            };
            const postItem = {
                poll_info: pollInfo,
                options: items,
              };
            axios
                .post("/api/polls", postItem)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response);
                    }
                    })
                    .catch((error) => {
                    console.log(error);
                    }); 
            }
        console.log('Button clicked!');
      }

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
                            value={title}  // bind the title state variable
                            onChange={handleTitleChange}  // handle the title change
                        />

                        <Typography variant="h6" component="h2" gutterBottom style={{ color: 'black'}} marginTop={3}>
                            Description
                        </Typography>

                        <TextField
                            required
                            id="filled-required"
                            label="Enter form description here"
                            variant="filled"
                            fullWidth
                            value={description}  // bind the description state variable
                            onChange={handleDescriptionChange}  // handle the description change
                        />

                        <Typography variant="h6" component="h2" gutterBottom style={{ color: 'black'}} marginTop={3}>
                            Poll Event Type
                        </Typography>

                        <FormControl variant="filled" sx={{ minWidth: 380 }}>
                            <InputLabel id="electoral-division-label" required>Select Event Type</InputLabel>
                            <Select
                                labelId="electoral-division-label"
                                id="electoral-division-select"
                                value={eventType}
                                onChange={handleEventTypeChange}
                            >
                                <MenuItem value={'GE'}>General Elections</MenuItem>
                                <MenuItem value={'FRU'}>Facilities Renovation Upgrade</MenuItem>
                                <MenuItem value={'CS'}>Colour Scheme</MenuItem>
                            </Select>
                        </FormControl>

                        {['GE', 'FRU', 'CS'].includes(eventType) && (
                            <>
                                <Typography variant="h6" component="h2" gutterBottom style={{ color: 'black'}} marginTop={3}>
                                    Electoral Division
                                </Typography>

                                <FormControl variant="filled" sx={{ minWidth: 380 }}>
                                    <InputLabel id="electoral-division-label" required>Select Electoral Division</InputLabel>
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

                                <FormControl key={electoralDivision} variant="filled" sx={{ minWidth: 380 }}>
                                    <InputLabel id="constituency-label" required>Select Constituency</InputLabel>
                                    <Select
                                        labelId="constituency-label"
                                        id="constituency-select"
                                        value={constituency}
                                        onChange={handleConstituencyChange}
                                    >
                                        {getConstituencyOptions()}
                                    </Select>
                                </FormControl>
                            </>
                        )}

                        <Typography variant="h6" component="h2" gutterBottom style={{ color: 'black'}} marginTop={3}>
                            {eventType === 'GE' ? 'Candidates' : 'Options'}
                        </Typography>

                        {items.map((item, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                <TextField
                                    required
                                    id={`item-${index}`}
                                    label={eventType === 'GE' ? `Enter candidate ${index + 1} name here` : `Enter option ${index + 1} here`}
                                    variant="filled"
                                    fullWidth
                                    value={item}
                                    onChange={(event) => handleItemChange(event, index)}
                                />
                                {index > 1 && (
                                    <Button variant="text" color="secondary" onClick={() => removeItem(index)} style={{marginLeft: '10px'}}>
                                        Remove
                                    </Button>
                                )}
                            </Box>
                        ))}

                        <Stack direction="row" marginTop={2}>
                            <Button 
                                color="secondary"
                                sx={{ '&:hover': { backgroundColor: '#aa2e25' }}}
                                variant="contained" 
                                endIcon={eventType === 'GE' ? <PersonAddIcon /> : <AddIcon />} 
                                onClick={addItem}>
                                {eventType === 'GE' ? 'Add Candidate' : 'Add Option'}
                            </Button>
                        </Stack>

                        <Typography variant="h6" component="h2" gutterBottom style={{ color: 'black'}} marginTop={3}>
                            Start Poll
                        </Typography>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker 
                            label="Basic date time picker"
                            onChange={handleStartTimeChange} />
                        </DemoContainer>
                        </LocalizationProvider>

                        <Typography variant="h6" component="h2" gutterBottom style={{ color: 'black'}} marginTop={3}>
                            End Poll
                        </Typography>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker 
                            label="Basic date time picker"
                            onChange={handleEndTimeChange} />
                        </DemoContainer>
                        </LocalizationProvider>

                        <FormGroup>
                            <FormControlLabel 
                                required 
                                control={
                                    <Switch defaultChecked color="secondary" />
                                }
                                label="Compulsory"
                                onChange={handleCompulsoryTypeChange}
                                sx={{ 
                                    color: 'black',
                                    mt: 3
                                }} />
                        </FormGroup>
                        
                        <Stack direction="row" marginTop={10}>
                            <Button 
                                color="secondary"
                                sx={{ '&:hover': { backgroundColor: '#aa2e25' }}}
                                variant="contained" 
                                onClick={handleCreateClick}
                                startIcon={<CreateIcon />}>
                                Create Poll Form
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};