import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
const pagesLoggedOut = [{ label: 'How it works', action: () => {} }];

function Logo({ responsive }) {
  return (
    <>
      <AdbIcon sx={{ display: { xs: responsive ? 'flex' : 'none', md: responsive ? 'none' : 'flex' }, mr: 1 }} />
      <Typography
        variant={responsive ? 'h5' : 'h6'}
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: responsive ? 'flex' : 'none', md: responsive ? 'none' : 'flex' },
          flexGrow: responsive ? 1 : 0,
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
}

function ResponsiveMenu({ user, pages, anchorElNav, handleOpenNavMenu, handleCloseNavMenu, navigate }) {
  return (
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
        {pages.map((page, index) => (
          <MenuItem key={index} onClick={() => page.action(navigate)}>
            <Typography textAlign="center">{page.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

function DesktopMenu({ user, pages, navigate }) {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map((page, index) => (
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
}

function ProfileDropdown({ user, checked, onChange, handleOpenUserMenu, handleCloseUserMenu, handleLogout, anchorElUser }) {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user?.name || 'User Avatar'} src={user?.avatar || '/static/images/avatar/2.jpg'} />
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
        <MenuItem key={0}>
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
}

function ResponsiveAppBar({ checked = false, onChange = () => {} }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = userService?.userValue;
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleLogout = () => {
    userService?.logout();
    handleCloseUserMenu();
    navigate('/signin');
  };

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo responsive={false} />
            <ResponsiveMenu
              user={user}
              pages={user ? pagesLoggedIn : pagesLoggedOut}
              anchorElNav={anchorElNav}
              handleOpenNavMenu={handleOpenNavMenu}
              handleCloseNavMenu={handleCloseNavMenu}
              navigate={navigate}
            />
            <Logo responsive={true} />
            <DesktopMenu user={user} pages={user ? pagesLoggedIn : pagesLoggedOut} navigate={navigate} />
            {user ? (
              <ProfileDropdown
                user={user}
                checked={checked}
                onChange={onChange}
                handleOpenUserMenu={handleOpenUserMenu}
                handleCloseUserMenu={handleCloseUserMenu}
                handleLogout={handleLogout}
                anchorElUser={anchorElUser}
              />
            ) : (
              <ButtonGroup variant="contained" aria-label="Sign in/up button group">
                <Button component={RouterLink} to="/signin">
                  Sign In
                </Button>
                <Button component={RouterLink} to="/signup">
                  Sign Up
                </Button>
              </ButtonGroup>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
}

ResponsiveAppBar.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default ResponsiveAppBar;
