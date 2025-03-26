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
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Adb as AdbIcon, Menu as MenuIcon } from '@mui/icons-material';
import MaterialUISwitch from './MaterialUISwitch';
import { userService } from '../../features/Users/user.service';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Constants
const pagesLoggedIn = [
  { label: 'How it works', action: () => alert('Under development') },
  { label: 'Competitions', action: (navigate) => navigate('/competitions') },
  { label: 'My boards', action: (navigate) => navigate('/boards') },
  { label: "Songs I've missed", action: () => alert('Under development') },
];
const pagesLoggedOut = [{ label: 'How it works', action: () => alert('Under development') }];

function ResponsiveAppBar(props) {
  const { checked, onChange } = props;
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = userService.userValue;
  const navigate = useNavigate();

  const profileMenu = [
    { label: 'Dashboard', action: (navigate) => navigate('/dashboard') }, 
    // { label: 'Logout', action: () => onclick={handleLogout} } // Can't get this to work
  ];  

  // Handlers
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleLogout = () => {
    userService.logout();
    handleCloseUserMenu();
    navigate('/signin');
  };

  // Render Menu Items
  const renderMenuItems = (pages) =>
    pages.map((page, index) => (
      <MenuItem key={index} onClick={() => page.action(navigate)}>
        <Typography textAlign="center">{page.label}</Typography>
      </MenuItem>
    ));

    // Render Profile Items
    const renderProfileItems = (pages) =>
      pages.map((page, index) => (
        <MenuItem key={index} onClick={() => page.action(navigate)}>
          <Typography textAlign="center">{page.label}</Typography>
        </MenuItem>
      ));

  // Components
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
        href="/"
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

  const responsiveMenu = (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="navigation menu"
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
        {renderMenuItems(user ? pagesLoggedIn : pagesLoggedOut)}
      </Menu>
    </Box>
  );

  const desktopMenu = (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {(user ? pagesLoggedIn : pagesLoggedOut).map((page, index) => (
        <Button
          key={index}
          onClick={() => page.action(navigate)}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          {page.label}
        </Button>
      ))}
    </Box>
  );

  const profileDropdown = (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
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
        {renderProfileItems(profileMenu)}
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
    <ButtonGroup variant="contained" aria-label="Sign in/up button group">
      <Button component={RouterLink} to="/signin">
        Sign In
      </Button>
      <Button component={RouterLink} to="/signup">
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
            {responsiveMenu}
            {logoWithIconResponsive}
            {desktopMenu}
            {user ? profileDropdown : signInUp}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default ResponsiveAppBar;
