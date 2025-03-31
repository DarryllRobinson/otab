import React from "react";
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
import MaterialUISwitch from "./MaterialUISwitch";

export default function NavbarLayout({ checked, onChange }) {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            OTAB
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button color="inherit" href="/competitions">
              Competitions
            </Button>
            <Button color="inherit" href="/boards">
              Boards
            </Button>
            <MaterialUISwitch checked={checked} onChange={onChange} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
