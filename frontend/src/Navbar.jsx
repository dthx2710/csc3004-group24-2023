import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavbarLogo from "../src/assets/singapore-lion-logo-white.png";

const RootDiv = styled("div")({
  flexGrow: 1,
});

const MenuButtonTypography = styled(Typography)({
  marginRight: "auto",
  display: "flex",
  alignItems: "center",
});

const TitleTypography = styled(Typography)({
  marginLeft: "auto",
});

const Navbar = ({ username }) => {
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
                style={{ textDecoration: "none", color: "inherit" }}
              >
                SingPoll
              </Link>
            ) : (
              <Link
                to="/userhome"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                SingPoll
              </Link>
            )}
          </MenuButtonTypography>
          <TitleTypography variant="h6">{username}</TitleTypography>
          <TitleTypography
            onClick={() => {
              // clear sessionStorage and cookies
              sessionStorage.clear();
              document.cookie.split(";").forEach(function (c) {
                document.cookie = c
                  .replace(/^ +/, "")
                  .replace(
                    /=.*/,
                    "=;expires=" + new Date().toUTCString() + ";path=/"
                  );
              });
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
