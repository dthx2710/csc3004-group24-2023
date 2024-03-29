import { AppBar, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavbarLogo from "../src/assets/singapore-lion-logo-white.png";
import PropTypes from "prop-types";

const RootDiv = styled("div")({
  flexGrow: 1,
});

const MenuButtonTypography = styled(Typography)({
  marginRight: "auto",
  display: "flex",
  alignItems: "center",
  fontFamily: "Century Gothic",
});

const TitleTypography = styled(Typography)({
  marginLeft: "auto",
  fontFamily: 'Century Gothic',
  fontWeight: 'bold',
});

const Navbar = ({ username }) => {
  Navbar.propTypes = {
    username: PropTypes.string.isRequired,
  };
  const navigate = useNavigate();
  return (
    <RootDiv>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <MenuButtonTypography variant="h6">
            <img
              src={NavbarLogo}
              alt="Singapore Lion Logo"
              style={{ width: 50, height: 50, marginRight: "10px" }}
            />
            {username === "admin" ? (
              <Link
                to="/adminhome"
                style={{ textDecoration: "none", color: "inherit", fontWeight: "bold" }}
              >
                SingPoll
              </Link>
            ) : (
              <Link
                to="/userhome"
                style={{ textDecoration: "none", color: "inherit", fontWeight: "bold" }}
              >
                SingPoll
              </Link>
            )}
          </MenuButtonTypography>
          <TitleTypography variant="h6">{username}</TitleTypography>
          <TitleTypography
            onClick={() => {
              // clear sessionStorage
              sessionStorage.clear();
              navigate("/");
            }}
            color="inherit"
            variant="h6"
            sx={{ ml: 5, cursor: "pointer" }}
          >
            Logout
          </TitleTypography>
        </Toolbar>
      </AppBar>
    </RootDiv>
  );
};

export default Navbar;
