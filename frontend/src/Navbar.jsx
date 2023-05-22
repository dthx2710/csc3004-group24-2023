import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';

const RootDiv = styled('div')({
  flexGrow: 1,
});

const MenuButtonTypography = styled(Typography)({
  marginRight: 'auto',
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
