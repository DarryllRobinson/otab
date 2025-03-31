import React, { memo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Container,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router"; // Import useNavigate and useLocation
import MaterialUISwitch from "./MaterialUISwitch";

const NavbarLayout = memo(function NavbarLayout({ checked, onChange }) {
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook to get the current path

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            OTAB
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              color={
                location.pathname === "/competitions" ? "secondary" : "inherit"
              } // Highlight active link
              onClick={() => navigate("/competitions")} // Navigate to competitions
              aria-label="Competitions"
              sx={{ transition: "color 0.3s ease" }} // Smooth transition
            >
              Competitions
            </Button>
            <Button
              color={location.pathname === "/boards" ? "secondary" : "inherit"} // Highlight active link
              onClick={() => navigate("/boards")} // Navigate to boards
              aria-label="Boards"
              sx={{ transition: "color 0.3s ease" }} // Smooth transition
            >
              Boards
            </Button>
            <MaterialUISwitch
              checked={checked}
              onChange={onChange}
              inputProps={{ "aria-label": "Toggle dark mode" }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export default NavbarLayout;
