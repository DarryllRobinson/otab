import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Menu,
  MenuItem,
  //Slide,
  Toolbar,
  Tooltip,
  Typography,
  //useScrollTrigger
} from '@mui/material';

import { Adb as AdbIcon, Menu as MenuIcon } from '@mui/icons-material';

import MaterialUISwitch from './MaterialUISwitch';
import { userService } from '../../features/users/user.service';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const pagesLoggedIn = ['How it works', 'My boards', "Songs I've missed"];
const pagesLoggedOut = ['How it works'];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar(props) {
  const { checked, onChange } = props;
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  // To tell is user is logged in
  const user = userService.userValue;
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    console.log('logout triggered');
    userService.logout();
    handleCloseUserMenu();
    // console.log('logged out, trying to navigate...');
    navigate('/user/signin');
  };

  const logoWithIcon = (
    <>
      <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        LOGO
      </Typography>
    </>
  );

  const logoWithIconResponsive = (
    <>
      <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        LOGO
      </Typography>
    </>
  );

  const loggedOutMenuResponsive = (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {pagesLoggedOut.map((page) => (
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  const loggedInMenuResponsive = (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <MenuItem
          key={0}
          onClick={() => {
            alert('Under development');
          }}
        >
          <Typography textAlign="center">How it works</Typography>
        </MenuItem>
        <MenuItem
          key={1}
          onClick={() => {
            navigate('/competitions');
          }}
        >
          <Typography textAlign="center">Competitions</Typography>
        </MenuItem>
        <MenuItem
          key={2}
          onClick={() => {
            navigate('/boards');
          }}
        >
          <Typography textAlign="center">My boards</Typography>
        </MenuItem>
        <MenuItem
          key={3}
          onClick={() => {
            alert('Under development');
          }}
        >
          <Typography textAlign="center">Songs I've missed</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );

  const loggedInMenu = (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Button
        key={0}
        onClick={() => {
          alert('Under development');
        }}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        How it works
      </Button>
      <Button
        key={1}
        onClick={() => {
          navigate('/competitions');
        }}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        Competitions
      </Button>
      <Button
        key={2}
        onClick={() => {
          navigate('/boards');
        }}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        My boards
      </Button>
      <Button
        key={3}
        onClick={() => {
          alert('Under development');
        }}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        Songs I've missed
      </Button>
    </Box>
  );

  const loggedOutMenu = (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pagesLoggedOut.map((page) => (
        <Button
          key={page}
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          {page}
        </Button>
      ))}
    </Box>
  );

  const profileDropdown = (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key={0} onClick={null}>
          <Typography textAlign="center">Profile</Typography>
        </MenuItem>
        <MenuItem key={1} onClick={handleLogout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
        <MenuItem>
          <MaterialUISwitch
            aria-label="dark-switch"
            checked={checked}
            onChange={onChange}
            sx={{ display: 'flex' }}
          />
        </MenuItem>
      </Menu>
    </Box>
  );

  const signInUp = (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button component={RouterLink} to="/user/signin">
        Sign In
      </Button>
      <Button component={RouterLink} to="/user/signup">
        Sign Up
      </Button>
    </ButtonGroup>
  );

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {logoWithIcon}

            {user ? loggedInMenuResponsive : loggedOutMenuResponsive}
            {logoWithIconResponsive}
            {user ? loggedInMenu : loggedOutMenu}

            {user ? profileDropdown : signInUp}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
}
export default ResponsiveAppBar;
