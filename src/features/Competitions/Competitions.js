import React from "react";
import { Outlet } from "react-router";
import { Box, Typography, useTheme } from "@mui/material";

export default function Competitions() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginTop: 8,
        padding: 4,
        backgroundColor: theme.palette.background.default, // Use default background color
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Competitions
      </Typography>
      <Outlet />
    </Box>
  );
}
