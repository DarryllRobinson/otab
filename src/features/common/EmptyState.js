import React from "react";
import { Box, Typography } from "@mui/material";

export default function EmptyState({ message }) {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
}
