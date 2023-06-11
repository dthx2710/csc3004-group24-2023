import Navbar from "./Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

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
  // get username from sessionStorage
  const username = JSON.parse(sessionStorage.getItem("user")).username;
  return (
    <ThemeProvider theme={theme}>
      <Navbar username={username} />
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default Layout;
