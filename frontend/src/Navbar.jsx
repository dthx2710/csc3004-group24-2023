import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import NavbarLogo from '../src/assets/singapore-lion-logo-white.png';

const RootDiv = styled('div')({
  flexGrow: 1,
});

const MenuButtonTypography = styled(Typography)({
  marginRight: 'auto',
  display: 'flex',
  alignItems: 'center',
});

const TitleTypography = styled(Typography)({
  marginLeft: 'auto',
});

const Navbar = ({ username }) => {
  return (
    <RootDiv>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <MenuButtonTypography variant="h6">
            <img src={NavbarLogo} alt="Singapore Lion Logo" style={{ width: 50, height: 50, marginRight: '10px' }} />
            SingPoll
          </MenuButtonTypography>
          <TitleTypography variant="h6">
            {username}
          </TitleTypography>
        </Toolbar>
      </AppBar>
    </RootDiv>
  );
};

export default Navbar;
