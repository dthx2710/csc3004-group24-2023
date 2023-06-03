import * as React from 'react';
import axios from "axios";
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import LoginLogo from '../src/assets/singapore-lion-logo.png';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const LogoAvatar = styled(Avatar)(({ theme }) => ({
    margin: theme.spacing(1),
}));

export default function Login({ user, setUser, setSessionPassword, onLogin }) {
    const navigate = useNavigate();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState({ username: false, password: false });
    const [loginError, setLoginError] = React.useState(false);

    React.useEffect(() => {
        try {
            if (user.userInfo.userType == "admin") {
                console.log("User:", user);
                navigate("/adminhome");
            }
            else if (user.userInfo.userType == "user") {
                console.log("User:", user);
                navigate("/userhome");
            }
        } catch (error) {
            console.log(error);
        }
      }, [user]);

    const handleLogin = (event) => {
        event.preventDefault();
        
        // hardcoded username and password
        // const hardcodedUsername1 = "admin";
        // const hardcodedUsername2 = "user";
        // const hardcodedPassword = "password";

        const login = {
            username: username,
            password: password,
          };
        axios
        .post("http://localhost:8080/login", login)    
        .then((response) => {
          if (response.status === 200) {
            axios
              .get(`http://localhost:8080/user/${response.data.id}`)
              .then((res) => {
                console.log(res);
                setUser({ ...res.data });
                setSessionPassword(password);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((error) => {
          console.log(error);
          setLoginError(true);
        });

        // if ((username === hardcodedUsername1 || hardcodedUsername2) && password === hardcodedPassword) {
        //     // store username
        //     onLogin(username);
        //     // navigate to HomePage
        //     if (username === hardcodedUsername1) {
        //         navigate("/adminhome");
        //     }
        //     else {
        //         navigate("/userhome");
        //     }
        // } else {
        //     setLoginError(true);  // Set login error to true
        // }
      };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
            setError((prev) => ({ ...prev, username: !value }));
        } else if (name === 'password') {
            setPassword(value);
            setError((prev) => ({ ...prev, password: !value }));
        }
    };

    return (
        <>
            <div className="center-content">
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 13,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <LogoAvatar alt="Singapore Lion Logo" src={LoginLogo} sx={{ width: 200, height: 200}} />
                        <Typography component="h1" variant="h1" color="#df0023">
                            SingPoll
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleLogin}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                value={username}
                                onChange={handleChange}
                                error={error.username}
                                helperText={error.username && "Username is required"}
                                sx={{
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#df0023',
                                    },
                                }}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={handleChange}
                                error={error.password}
                                helperText={error.password && "Password is required"}
                                sx={{
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#df0023',
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="error"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            {loginError && <Alert severity="error">Invalid username or password!</Alert>}
                        </Box>
                    </Box>
                </Container>
            </div>
        </>
    );
}