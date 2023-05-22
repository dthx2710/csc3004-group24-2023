import * as React from 'react';
import Box from '@mui/material/Box';
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

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState({ username: false, password: false });
    const [loginError, setLoginError] = React.useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
      
        // hardcoded username and password
        const hardcodedUsername = "admin";
        const hardcodedPassword = "password";
      
        if (username === hardcodedUsername && password === hardcodedPassword) {
          // navigate to HomePage
          navigate("/home");
        } else {
          setLoginError(true);  // Set login error to true
        }
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