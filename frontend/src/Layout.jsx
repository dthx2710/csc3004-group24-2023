import Navbar from "./Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#f44336",
    },
  },
});

const Layout = ({ children }) => {
  Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    try {
      // get username from sessionStorage
      // const username = 'test';
      const user = sessionStorage.getItem("user");
      if (user === null) {
        // clear sessionStorage and navigate to login page
        sessionStorage.clear();
        navigate("/");
      } else {
        setUsername(JSON.parse(user).username);
      }
    } catch (err) {
      sessionStorage.clear();
      navigate("/");
      return null;
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar username={username} />
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default Layout;
