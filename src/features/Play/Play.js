import React, { useState } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useLocation } from "react-router";

import Board from "../Boards/Board";
import BoardCreate from "../Boards/BoardCreate";

export default function Play() {
  const { state } = useLocation();
  const theme = useTheme();
  const { boardId, compId, create, numTiles } = state || {};
  const [box, setBox] = useState(false);

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: theme.palette.background.default,
        padding: 2,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ marginBottom: 4 }}
      >
        Heading can go here
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          {create ? (
            <BoardCreate compId={compId} numTiles={numTiles} setBox={setBox} />
          ) : (
            <Board boardId={boardId} setBox={setBox} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
