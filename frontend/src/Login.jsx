import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import LoginLogo from "../src/assets/singapore-lion-logo.png";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const LogoAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
}));

export default function Login() {
  const HeaderTypography = styled(Typography)({
    fontFamily: 'Century Gothic',
    fontWeight: 'bold'
  });

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    username: false,
    password: false,
  });
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    try {
      // check if user is logged in via session
      const loggedIn = sessionStorage.getItem("loggedIn");
      if (loggedIn)
        navigate(
          JSON.parse(sessionStorage.getItem("user")).userType === "admin"
            ? "/adminhome"
            : "/userhome"
        );
    } catch (error) {
      console.log(error);
    }
  }, []);

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
      .post("/api/login", login)
      .then((response) => {
        if (response.status === 200) {
          // set response.data jwt to session storage
            sessionStorage.setItem("jwt", response.data.token);
          // get user info
          axios
            .get(`api/user`, {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
              },
            })
            .then((res) => {
              // destructure user info
              const { username, userType, constituencyId } = res.data.userInfo;
              const userInfo = {
                username,
                userType,
                constituencyId,
              };
              sessionStorage.setItem("loggedIn", "true");
              // store in session storage
              sessionStorage.setItem("user", JSON.stringify(userInfo));
              if (userType === "admin") {
                navigate("/adminhome");
              } else {
                navigate("/userhome");
              }
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
    if (name === "username") {
      setUsername(value);
      setError((prev) => ({ ...prev, username: !value }));
    } else if (name === "password") {
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LogoAvatar
              alt="Singapore Lion Logo"
              src={LoginLogo}
              sx={{ width: 200, height: 200 }}
            />
            <HeaderTypography component="h1" variant="h1" color="#df0023">
              SingPoll
            </HeaderTypography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleLogin}
            >
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
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#df0023",
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
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#df0023",
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
              {loginError && (
                <Alert severity="error">Invalid username or password!</Alert>
              )}
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
}
