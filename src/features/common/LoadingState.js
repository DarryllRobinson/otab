import React from "react";
import { Box, Typography } from "@mui/material";

export default function LoadingState() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">Loading...</Typography>
    </Box>
  );
}
